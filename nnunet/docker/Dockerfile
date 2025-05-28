# Start from the official nnU-Net runtime image
FROM fabianisensee/nnunet:latest

# Set working directory
WORKDIR /app

# Copy pre-trained weights into the image
# IMPORTANT: Ensure these paths match where weights will be downloaded or mounted
COPY ./weights/Task08_Kits /app/weights/Task08_Kits
COPY ./weights/Task20_ADPKD /app/weights/Task20_ADPKD

# Install Flask or FastAPI (choose one, FastAPI is generally more modern)
RUN pip install fastapi uvicorn

# Copy the inference application code into the image
COPY ./inference_app /app/inference_app

# Set environment variables for nnU-Net if necessary
# ENV nnUNet_raw_data_base="/app/raw_data"
# ENV nnUNet_preprocessed="/app/preprocessed_data"
ENV RESULTS_FOLDER="/app/results"

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application
# This assumes your FastAPI app is in inference_app/main.py and the app instance is named 'app'
CMD ["uvicorn", "inference_app.main:app", "--host", "0.0.0.0", "--port", "8000"]
