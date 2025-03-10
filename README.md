# Ticket Checking System

A basic ticketing system that generates QR codes from a CSV file and verifies them through a web-based scanner.

## Features

- Converts CSV entries into QR codes with unique IDs.
- Generates an output file containing QR codes.
- Uses `html5-qrcode` to scan and validate tickets.
- Displays status messages: **Success**, **Failure**, or **Already Scanned**.

## Installation & Usage

### 1. Clone the Repository

```sh
  git clone https://github.com/tmonga2208/ticket_checking_system.git
  cd ticket_checking_system
```

### 2. Generate QR Codes from CSV

Navigate to the `python_script` folder and run the script:

```sh
  cd python_script
  python qrscript.py
```

This script:

- Reads the CSV file containing names and unique IDs.
- Generates QR codes for each entry.
- Creates an output file containing the QR codes.

### 3. Use the Website for Scanning

- Use the generated output file in the web interface.
- The website utilizes `html5-qrcode` for scanning.
- It validates the unique ID and displays the result:
  - ✅ **Success**: Valid ticket.
  - ❌ **Failure**: Invalid ticket.
  - ⚠️ **Already Scanned**: Ticket was used before.

## Technologies Used

- **Python** (for QR code generation)
- **HTML5 + JavaScript** (`html5-qrcode` for scanning)

## Contribution

Feel free to fork and contribute by creating pull requests.

## License

This project is open-source and available under the MIT License.

---
Happy scanning! 🚀
