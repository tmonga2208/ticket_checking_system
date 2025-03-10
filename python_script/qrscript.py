import pandas as pd
import qrcode
import uuid
import os

def generate_qr_from_csv(input_csv: str, output_csv: str, output_folder: str):
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Read input CSV
    df = pd.read_csv(input_csv)

    # Ensure the CSV has a 'Name' column
    if 'NAME' not in df.columns:
        raise ValueError("Input CSV must have a 'Name' column")

    unique_ids = []
    qr_filenames = []

    for name in df['NAME']:
        unique_id = str(uuid.uuid4())  # Generate a unique ID
        
        # Generate QR Code
        qr = qrcode.make(unique_id)
        qr_filename = os.path.join(output_folder, f"{name}.png")
        qr.save(qr_filename)
        
        unique_ids.append(unique_id)
        qr_filenames.append(qr_filename)

    # Add new data to DataFrame
    df['Unique ID'] = unique_ids
    df['QR Code Path'] = qr_filenames

    # Save output CSV
    df.to_csv(output_csv, index=False)

    print(f"QR codes generated and saved in '{output_folder}'. Output CSV saved as '{output_csv}'")

# Example usage
generate_qr_from_csv('example_csv.csv', 'output.csv', 'qrcodes')
