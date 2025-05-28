from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import subprocess # For calling nnUNet_predict

app = FastAPI()

# Ensure RESULTS_FOLDER exists (nnU-Net might create it, but good to be sure)
os.makedirs(os.environ.get("RESULTS_FOLDER", "/app/results"), exist_ok=True)

class InferenceRequest(BaseModel):
    jobId: str
    modelId: str # e.g., "Task08_Kits" or "Task20_ADPKD"
    signedGCSUrlList: list[str] # For now, assume a single NIfTI file URL

class InferenceResponse(BaseModel):
    jobId: str
    signedGCSUrlToMask: str

@app.post("/predict", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    # TODO:
    # 1. Download file(s) from signedGCSUrlList to a temporary input directory
    #    For now, let's assume the file is a NIfTI and nnU-Net can handle URLs or local paths.
    #    For simplicity, we'll mock file download and use a placeholder input.
    
    input_dir = "/app/input_temp" # nnU-Net needs an input *directory*
    output_dir = os.path.join(os.environ["RESULTS_FOLDER"], request.jobId)
    
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)

    # Placeholder for actual file download and naming
    # Example: downloaded_file_path = os.path.join(input_dir, "image_0000.nii.gz")
    # For now, we'll assume nnU-Net will look for files matching a pattern.
    # If nnU-Net needs specific naming like _0000.nii.gz, that needs to be handled.

    print(f"Received prediction request for job {request.jobId} with model {request.modelId}")
    print(f"Input URLs: {request.signedGCSUrlList}")

    # This is a simplified call. nnU-Net CLI can be complex.
    # You'll need to map modelId to the correct Task ID (e.g., Task008_KiTS19)
    # and specify input and output folders.
    # The `-i` flag takes an INPUT_FOLDER, not a direct file.
    # The `-o` flag takes an OUTPUT_FOLDER.
    # The `-t` flag takes the Task ID (e.g., 8 or "Task008_KiTS19").
    # The `-m` flag specifies the configuration (e.g., 3d_fullres).
    # The `-f` flag specifies folds (e.g., 0 1 2 3 4 for all, or 'all').
    # Pretrained models usually have specific fold configurations.

    # Mocking the nnU-Net call for now as setting it up correctly is complex
    # and requires the weights to be in the expected nnU-Net structure.
    
    # Example of what a real call might look like (needs adjustment):
    # command = [
    #     "nnUNet_predict",
    #     "-i", input_dir,
    #     "-o", output_dir,
    #     "-t", request.modelId, # This needs to be the numeric or string Task ID
    #     "-m", "3d_fullres",    # Or other configuration
    #     "-f", "all",           # Or specific folds for the pretrained model
    #     "--disable_tta"        # Disable test-time augmentation for speed if needed
    # ]
    # print(f"Running command: {' '.join(command)}")
    # try:
    #     subprocess.run(command, check=True, capture_output=True, text=True)
    #     print("nnU-Net prediction successful.")
    # except subprocess.CalledProcessError as e:
    #     print(f"nnU-Net prediction failed: {e.stderr}")
    #     raise HTTPException(status_code=500, detail=f"nnU-Net inference failed: {e.stderr}")

    # Mock result: create a dummy NIfTI file as the output
    mock_mask_filename = f"{request.jobId}_mask.nii.gz"
    mock_mask_path = os.path.join(output_dir, mock_mask_filename)
    with open(mock_mask_path, "w") as f:
        f.write("This is a mock NIfTI file.") # Create a dummy file

    # TODO: Upload mock_mask_path to GCS and get a signed URL
    mock_signed_url = f"gs://your-bucket-name/results/{request.jobId}/{mock_mask_filename}"

    return InferenceResponse(
        jobId=request.jobId,
        signedGCSUrlToMask=mock_signed_url
    )

@app.get("/")
def read_root():
    return {"message": "nnU-Net Inference Service"}
