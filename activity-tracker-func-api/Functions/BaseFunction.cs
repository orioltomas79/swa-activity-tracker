using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace ActivityTracker.FuncApi.Functions
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

            var result = JsonConvert.DeserializeObject<T>(requestBody);

            if (result == null) 
            {
                throw new Exception("Error deserializing the request body.");
            } 

            return result;
        }
    }
}
