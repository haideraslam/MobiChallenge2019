
using System;
using System.Threading.Tasks;
using Microsoft.Azure.Devices;

namespace back_end_application
{
    class BackEndApplication
    {
        private static ServiceClient s_serviceClient;
        
        // Connection string for iot-hub-mobi
        private readonly static string s_connectionString = "HostName=iot-hub-mobi.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=lI0xifljYwrDBQnlC3fJshGS/buNxdOTsSDFdjJ5R24=";


         private static async Task InvokeRemoteFunc(string remoteFunc, string vin, string contractId)
        {
            var methodInvocation = new CloudToDeviceMethod(remoteFunc) { ResponseTimeout = TimeSpan.FromSeconds(30) };
            methodInvocation.SetPayloadJson(contractId);

            // Invoke the direct method asynchronously and get the response from the simulated device.
            var response = await s_serviceClient.InvokeDeviceMethodAsync(vin, methodInvocation);

            Console.WriteLine("Response status: {0}, payload:", response.Status);
            Console.WriteLine(response.GetPayloadAsJson());
        }

        private static void Main(string[] args)
        {
            Console.WriteLine("Remote control application for controlling devices through MOBI IoT Hub...\n");

            var remoteFunc = args[0].Trim();
            var vin = args[1].Trim();
            var contractId = args[2].Trim();

            if((!String.IsNullOrEmpty(vin)) && (remoteFunc == "Lock" || remoteFunc == "Unlock"))
            {
                s_serviceClient = ServiceClient.CreateFromConnectionString(s_connectionString);
                InvokeRemoteFunc(remoteFunc, vin, contractId).GetAwaiter().GetResult();
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Cannot execute - Check your arguments!.");
                Console.ResetColor();
            }
        }
    }
}
