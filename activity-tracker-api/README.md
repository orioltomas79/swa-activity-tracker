# Azure Functions REST API

To run the application in a local environment we have to start Blob Storage emulator (Azurite): Azurite-Blob

To install azurite in your laptop you can run npm install -g azurite
https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=npm%2Cblob-storage#install-azurite

To run azurite:
azurite --silent --location azurite

We can run the ActivityTracker.Api project with Visual Studio or with the command line: func host start

# Useful links:

Azure Functions HTTP trigger
https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cin-process%2Cfunctionsv2&pivots=programming-language-csharp
