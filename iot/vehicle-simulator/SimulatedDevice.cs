// Author: Huma Qureshi

using System;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace simulated_device
{
    class SimulatedDevice
    {
        enum VehicleStatus
        {
            droppedOff,
            pickedUp,
            onTrip
        }

        struct Location
        {
            public double lat;
            public double lon;
        }

        private static DeviceClient s_deviceClient;
        private static string myVin;
        private static double currentMilage;
        private static int carAvgFuelConsumptionRate;
        private static int tripAvgFuelConsumptionRate;
        private static int avgMilesPerHour;
        private static String contractId;
        private static bool requestLock = false;
        private static string requestLockContractId = String.Empty;
        private static int hardBreakProbability = 0;
        private static IEnumerable<Location> route;
        private static VehicleStatus status = VehicleStatus.droppedOff; //default in dropped off state


        // The device connection string to authenticate the device with your IoT hub.
        // Using the Azure CLI:
        // az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyDotnetDevice --output table
        //private readonly static string s_connectionString = "HostName=iot-hub-mobi.azure-devices.net;DeviceId=sim-car1;SharedAccessKey=MTpeX3gJjtBY+aGnNS97DXTmf+nWHEdCgkkdMEha28g=";
        private static string connectionString; // = "HostName=iot-hub-mobi.azure-devices.net;DeviceId=WP0ZZZ99ZJS167001;SharedAccessKey=Z1eoutnDcKzSsFPhy7oUB4sEfP4Zqcye1/JHE8AaNkI=";
        private static int telemetryInterval = 2500; // Milliseconds
        private static Task<MethodResponse> Lock(MethodRequest methodRequest, object userContext)
        {
           if(status == VehicleStatus.onTrip)
           {
                var data = Encoding.UTF8.GetString(methodRequest.Data);
                requestLock = true;
                char[] charsToTrim = {' ', '\\', '\"'};
                requestLockContractId = data.Trim(charsToTrim);
                // Acknowlege the direct method call with a 200 success message
                string result = "{\"result\":\"Executed direct method: " + methodRequest.Name + "\"}";
                return Task.FromResult(new MethodResponse(Encoding.UTF8.GetBytes(result), 200));
            }
            else
            {
                // Acknowlege the direct method call with a 400 error message
                string result = "{\"result\":\"Invalid status update. Existing Status must be on trip\"}";
                return Task.FromResult(new MethodResponse(Encoding.UTF8.GetBytes(result), 400));
            }
        }

        private static Task<MethodResponse> Unlock(MethodRequest methodRequest, object userContext)
        {
            if(status == VehicleStatus.droppedOff)
           {
               Random rand = new Random();
                var data = Encoding.UTF8.GetString(methodRequest.Data);
                char[] charsToTrim = {' ', '\\', '\"'};
                contractId = data.Trim(charsToTrim);

                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Car Unlocked - On trip now!");
                Console.ResetColor();
                status = VehicleStatus.pickedUp;
                tripAvgFuelConsumptionRate = carAvgFuelConsumptionRate + rand.Next(-3, 3); // every trip can have a varying average rate 
                // Acknowlege the direct method call with a 200 success message
                string result = "{\"result\":\"Executed direct method: " + methodRequest.Name + "\"}";
                return Task.FromResult(new MethodResponse(Encoding.UTF8.GetBytes(result), 200));
            }
            else
            {
                // Acknowlege the direct method call with a 400 error message
                string result = "{\"result\":\"Invalid status update. Existing Status must be dropped-off\"}";
                return Task.FromResult(new MethodResponse(Encoding.UTF8.GetBytes(result), 400));
            }
        }


        // Async method to send simulated telemetry
        private static async Task SendDeviceToCloudMessagesAsync()
        {
            Random rand = new Random();
            var routeEnumerator = route.GetEnumerator();
            routeEnumerator.MoveNext();

            while (true)
            {
                if(status == VehicleStatus.onTrip || status == VehicleStatus.pickedUp)
                {
                    // Create JSON message
                    
                    if(requestLock && requestLockContractId.Trim() == contractId.Trim())
                    {
                        status = VehicleStatus.droppedOff; // there will be no telemetry after this.
                        //contractId = String.Empty;
                        requestLock = false;
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine();
                        Console.WriteLine("Car Locked! - Trip ended!");
                        Console.ResetColor();
                    }

                    var telemetryDataPoint = new
                    {
                        vin = myVin,
                        milage = Math.Round(currentMilage, 4),
                        contractId = contractId,
                        lat = routeEnumerator.Current.lat,
                        lon = routeEnumerator.Current.lon,
                        noOfHardBreaks = rand.Next(1,100) < hardBreakProbability ? 1 : 0,
                        collisionDetection = rand.Next(1,100) < 5 ? 1 : 0, // fixed 5% rate
                        tirePressure = rand.Next(29, 30).ToString() + ',' + rand.Next(29, 30).ToString() + ',' + rand.Next(30, 32).ToString() + ',' + rand.Next(30, 32).ToString(),
                        fuelConsumptionRate = tripAvgFuelConsumptionRate + rand.Next(-2 , 2),
                        speed = avgMilesPerHour + rand.Next(-5, 5),
                        status = status.ToString()
                    };

                    var messageString = JsonConvert.SerializeObject(telemetryDataPoint);
                    var message = new Message(Encoding.ASCII.GetBytes(messageString));
                    message.ContentType = "application/json"; 

                    // Send the tlemetry message
                    await s_deviceClient.SendEventAsync(message);
                    Console.ForegroundColor = ConsoleColor.Blue;
                    Console.WriteLine(".");
                    Console.ResetColor();

                    if(status == VehicleStatus.pickedUp)
                    {
                        // after one picked-up status subsequent messages will have ontrip status.
                        status = VehicleStatus.onTrip;
                    }

                    var milesPerSecond = (double)avgMilesPerHour/3600;
                    bool hasMorePoint = routeEnumerator.MoveNext();
                    if(!hasMorePoint) 
                    {
                        routeEnumerator = route.GetEnumerator();
                        routeEnumerator.MoveNext();
                    }
                    currentMilage = currentMilage + (telemetryInterval/1000) * milesPerSecond;

                }
                
                await Task.Delay(telemetryInterval);
            }
        }
        private static async Task Main(string[] args)
        {
            // dotnet run XXXXX 778 100 10 23 
            Console.WriteLine("OTOZ - Simulated device. Ctrl-C to exit.\n");
            myVin = args[0];
            currentMilage = System.Convert.ToInt32(args[1]);
            bool initMoving =  System.Convert.ToInt32(args[2]) == 1;
            avgMilesPerHour = System.Convert.ToInt32(args[3]);
            hardBreakProbability = System.Convert.ToInt32(args[4]);
            carAvgFuelConsumptionRate = System.Convert.ToInt32(args[5]);
            connectionString = args[6];
            var routeFilePath = args[7];

            if(initMoving)
            {
                status = VehicleStatus.onTrip;
            }

            string text = System.IO.File.ReadAllText(routeFilePath);
            var points = text.Split('|');
            route = points.Select( p => new Location
                                        {
                                            lat = Convert.ToDouble(p.Split(',')[1].Trim()),
                                            lon = Convert.ToDouble(p.Split(',')[0].Trim())
                                        });

            // Connect to the IoT hub using the MQTT protocol
            s_deviceClient = DeviceClient.CreateFromConnectionString(connectionString, TransportType.Mqtt);

            // Create a handler for the direct method call
            s_deviceClient.SetMethodHandlerAsync("Lock", Lock, null).Wait();
            s_deviceClient.SetMethodHandlerAsync("Unlock", Unlock, null).Wait();

            await SendDeviceToCloudMessagesAsync();
            Console.WriteLine("exiting...");
            
        }
    }
}
