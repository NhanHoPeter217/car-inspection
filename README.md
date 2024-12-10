# Car Inspection App

An application for car inspectors to report and track car inspection results.

[**Live Demo (Deployed Product)**](https://car-inspection-murex.vercel.app/)

[**Entity Relationship Diagram**](https://drive.google.com/file/d/1E8NvXJqxuS_lvmU9ciWljak1C87bXEbF/view?usp=drive_link)

## User Story

**As a car inspector,**  
I need an app to report my car inspection results. The application should support the following features:

---

## Features

### 🚗 **Car Management**
- **List of Cars**: View a list of all cars available for inspection.
- **Inspection Status**: Track the current inspection status of each car:
  - **0** - Not Inspected
  - **1** - Inspecting
  - **2** - Inspected

---

### 📋 **Inspection Criteria**
- The inspection is based on a maximum of **5 criteria**.
- For each car inspection, every criterion includes:
  - **Good**: Mark whether the criterion is passed or failed.
  - **Note**: A note field is available and required only if a criterion is **not passed** ("Not Good").

> **Note**: The inspection criteria are consistent across all cars and can be modified as needed.

---

### ✅ **Inspection Status Calculation**
- If **all 5 criteria** are met (Good), the car's status is set to **Inspected**.
- If **some criteria** are met (1–4 Good criteria), the car's status is set to **Inspecting**.
- If **no criteria** are met (0 Good criteria), the car's status remains **Not Inspected**.

---

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express, Sequelize (ORM)
- **Database**: PostgreSQL
