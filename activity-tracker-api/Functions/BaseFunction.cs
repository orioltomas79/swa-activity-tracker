using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Functions
{
    public class BaseFunction
    {
        protected static async Task<T> GetRequestBodyAsync<T>(HttpRequest req)
        {
            string requestBody;
            using (var streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }
            return JsonConvert.DeserializeObject<T>(requestBody);
        }
    }
}
