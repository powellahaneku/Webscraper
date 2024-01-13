# Web Scrapper ETL Tool

## Purpose
The JavaScript code serves as a web scraper to extract and analyze student information from a specific web interface. It automates the process of gathering data related to students and their academic records.

## Initial Instructions
1. **Alert and Instructions**: Upon execution, the code displays an alert guiding the user and providing instructions on how to use the tool effectively.

2. **Input Prompt**: Requests the user to input a list of student IDs copied from an Excel sheet. The provided IDs serve as the basis for data extraction.

## Data Processing Functions
3. **Fix List Function**: Converts the input string into an array of integers representing student IDs by splitting the input string and converting the substrings to integers.

4. **Start Function**: Initiates the process to collect information for each student in the list.
    - Uses a loop to iterate through the list of student IDs.
    - Calls the `openPage()` function for each student ID to extract data.

5. **OpenPage Function**: Opens the web interface, searches for the student ID, collects information, and saves it.
    - Sets the student ID in the search field and triggers a search button click.
    - Waits for the data to load by using a timeout function.
    - Collects student information using various functions (`personalInfo()`, `serviceIndicator()`, `countGrades()`, etc.).
    - Saves the collected information in an object and adds it to the `listFound`.

6. **PersonalInfo Function**: Retrieves personal details (such as name, email, and phone number) of the student using query selectors.

7. **ServiceIndicator Function**: Gathers information related to service indicators for the student, such as counts and specific indicators, by querying the DOM.

8. **CountGrades Function**: Analyzes the student's grades, computes various statistics like counts of specific grades, and checks if the student is at risk academically.

## Additional Features
9. **DownloadExcel Function**: Prepares and downloads a CSV file containing the collected student information.

10. **StatusData Function**: Provides information on the current status of the data processing, including the number of students found and not found.

## Script Execution
- The script ensures the web page is fully loaded before initiating the data extraction process to avoid errors.
- Provides functions to refresh the page if required for smoother execution.

## Local Storage Handling
- Utilizes local storage to store and retrieve the collected student information to prevent data loss in case of script interruption or reload.

## Error Handling
- Implements error handling by checking for null or undefined data and logging error messages.

## Final Instructions
- Ends with a prompt informing the user to reach out via email for further discussions or issues encountered.

This code streamlines the process of scraping student data from a web interface, providing detailed information and statistics about each student for analysis and record-keeping purposes.
