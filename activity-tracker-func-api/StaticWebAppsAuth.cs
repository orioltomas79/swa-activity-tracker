using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace ActivityTracker.FuncApi;

public static class StaticWebAppsAuth
{
    private class ClientPrincipalHeader
    {
        public string IdentityProvider { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string UserDetails { get; set; } = string.Empty;
        public IEnumerable<string> UserRoles { get; set; } = [];
    }

    public static ClaimsPrincipal GetClaimsPrincipal(HttpRequest req)
    {
        var clientPrincipalHeader = GetClientPrincipalHeader(req);

        clientPrincipalHeader.UserRoles = clientPrincipalHeader.UserRoles.Except(["anonymous"], StringComparer.CurrentCultureIgnoreCase);

        if (!clientPrincipalHeader.UserRoles?.Any() ?? true)
        {
            return new ClaimsPrincipal();
        }

        var identity = new ClaimsIdentity(clientPrincipalHeader.IdentityProvider);
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, clientPrincipalHeader.UserId));
        identity.AddClaim(new Claim(ClaimTypes.Name, clientPrincipalHeader.UserDetails));
        identity.AddClaims(clientPrincipalHeader.UserRoles!.Select(r => new Claim(ClaimTypes.Role, r)));

        return new ClaimsPrincipal(identity);
    }

    private static ClientPrincipalHeader GetClientPrincipalHeader(HttpRequest req)
    {
        if (req.Headers.TryGetValue("x-ms-client-principal", out var header))
        {
            var data = header[0];
            var decoded = Convert.FromBase64String(data!);
            var json = Encoding.UTF8.GetString(decoded);
            var clientPrincipalHeader = JsonSerializer.Deserialize<ClientPrincipalHeader>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (clientPrincipalHeader == null)
            {
                throw new Exception($"Error deserializing {nameof(ClientPrincipalHeader)}");
            }
            return clientPrincipalHeader;
        }

#if DEBUG
        // For local testing only.
        // We can test the backend without the frontend by creating a ClientPrincipal manually
        // if the header x-ms-client-principal is not present.

        return new ClientPrincipalHeader
        {
            IdentityProvider = "github",
            UserId = "fake-user-id",
            UserDetails = "fake-user-name",
            UserRoles = ["authenticated"]
        };
#endif
    }


    public static string GetUserId(this ClaimsPrincipal input)
    {
        return input.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)!.Value;
    }
}