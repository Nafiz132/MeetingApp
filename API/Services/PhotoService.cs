// using API.Helpers;
// using API.Interfaces;
// using CloudinaryDotNet;
// using CloudinaryDotNet.Actions;
// using Microsoft.Extensions.Options;

// namespace API.Services
// {
//     public class PhotoService : IPhotoService
//     {
//         private readonly Cloudinary _cloudinary;
//         // public PhotoService(IOptions<CloudinarySettings>config)
//         // {
//         //     var acc= new Account
//         //     (
//         //         config.Value.CloudName,
//         //         config.Value.Apikey,
//         //         config.Value.ApiSecret
//         //     );
//         //     _cloudinary=new Cloudinary(acc);
//         // }
//         public PhotoService(IOptions<CloudinarySettings> config)
//         {
//             // Validate Cloudinary settings
//             if (config?.Value?.CloudName == null || config.Value.Apikey == null || config.Value.ApiSecret == null)
//             {
//                 throw new ArgumentException("Cloudinary configuration is missing.");
//             }

//             var acc = new Account(
//                 config.Value.CloudName,
//                 config.Value.Apikey,
//                 config.Value.ApiSecret
//             );

//             _cloudinary = new Cloudinary(acc);
//         }


//         // public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
//         // {
//         //     var uploadResult=new ImageUploadResult();
//         //     if(file.Length>0)
//         //     {
//         //         using var stream =file.OpenReadStream();
//         //         var uploadParams=new ImageUploadParams
//         //         {
//         //             File= new FileDescription(file.FileName, stream),
//         //             Transformation= new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
//         //             Folder="da-net7"
//         //         };
//         //         uploadResult=await _cloudinary.UploadAsync(uploadParams);
//         //     }
//         //     return uploadResult;
//         // }
//         public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
//         {
//             // Step 1: Check if the file is null or empty
//             if (file == null || file.Length == 0)
//             {
//                 throw new ArgumentException("No file uploaded.");
//             }

//             var uploadResult = new ImageUploadResult();

//             try
//             {
//                 // Step 2: Proceed with uploading the file to Cloudinary
//                 using var stream = file.OpenReadStream();
//                 var uploadParams = new ImageUploadParams
//                 {
//                     File = new FileDescription(file.FileName, stream),
//                     Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
//                     Folder = "da-net7"
//                 };

//                 uploadResult = await _cloudinary.UploadAsync(uploadParams);
//             }
//             catch (Exception ex)
//             {
//                 // Step 3: Catch any errors during the upload
//                 throw new Exception("Error uploading photo to Cloudinary", ex);
//             }

//             return uploadResult;
//         }

//         public async Task<DeletionResult> DeletePhotoAsync(string publicId)
//         {
//             var deleteParams = new DeletionParams(publicId);

//             return await _cloudinary.DestroyAsync(deleteParams);
//         }
//     }
// }
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
 {
    public class PhotoService : IPhotoService{
    private readonly Cloudinary _cloudinary;
    public PhotoService(IOptions<CloudinarySettings>config)
    {
        var acc= new Account(
        config.Value.CloudName,
        config.Value.Apikey,
        config.Value.ApiSecret
       
        );
       
        _cloudinary= new Cloudinary(acc);
    }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult= new ImageUploadResult();
            if(file.Length>0){
                using var stream=file.OpenReadStream();
                var uploadParams= new ImageUploadParams
                {
                    File=new FileDescription(file.FileName, stream),
                    Transformation= new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder= "da-net7"
                };
                uploadResult=await _cloudinary.UploadAsync(uploadParams);
            }    
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams= new DeletionParams(publicId);

            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
    