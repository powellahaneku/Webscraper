// Written by Powell Ahaneku, Medgar Evers College Alumn. Financial Economics BS


alert("QUICK GUIDE: \n\nWelcome, let's get you started!\n\nRemember that the EmpID should all be separated by spaces before pasting it in. (I usually use chat GPT for that)\n\nAlso, sometimes the DOM loads faster if you click the ID input box and right click \"inspect\" it before starting this code. Do that if this session crashes")
///
var input = prompt("Student List: ");

//Risk Metrics
const gpaTreshold = 2.3 //GPA's under this will be flagged
const academicYear = '2023' //This is the academic year of the student
const studentsNotFound = []


// ///
// function academicYearTranslate(){
// 	const resultYear = []
// 	if (String(year)[0]>1){
// 		resultYeay.push('0')
// 	}
// 	if (String(year)[2]>1){
// 		resultYear.push('0')
// 	}
// }

function fixList(input) {
  let fixed = input.split('\n');
  for (let i = 0; i < fixed.length; i++) {
    fixed[i] = parseInt(fixed[i], 10); // Use parseInt and assign back to the array element
  }
  return fixed;
}

var list = [fixList(input)];
	list = list.flat(1)
	console.log(`Loaded ${list.length} ID's`)

var field = document.querySelector("#CU_SIQSRI_SRCH_EMPLID");

function performSearch() {
    let searchBtn = document.querySelector("#\\#ICSearch");
    searchBtn.click();
}

function backToSearchPage(){
    let backSearchBtn = document.querySelector("#\\#ICList")
    backSearchBtn.click()
	if (list.length > 0){
		setTimeout(()=>{
			start()
		},2000)
	} else {
		
		console.table(listFound) 
		console.log(`Not Found: ${removeDuplicates(studentsNotFound) }`)
		console.log('Downloading CSV...')
		downloadExcel(listFound, "data.csv")
		// Check if the key exists in local storage
		if (localStorage.getItem('_listFound')) {
			// Remove the key from local storage
			localStorage.removeItem('_listFound');
			console.log('Key "_listFound" removed from local storage.');
		} else {
			console.log('Key "_listFound" not found in local storage.');
		}

		
		}
	}

function downloadExcel(data, filename) {
  // Filter out null values
  const cleanData = data.filter(i => i != null);

  // Check if there's any data to export
  if (cleanData.length === 0) {
	console.error("No valid data to export.");
	return;
  }

  const dataArray = [Object.keys(cleanData[0])].concat(cleanData.map(person => Object.values(person)));

  const sheet = String.fromCharCode(65); // ASCII code for 'A'
  const blobData = [["sep=,"], ...dataArray].map(row => row.join(',')).join('\n');
  const blob = new Blob([blobData], { type: 'text/csv' });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  link.click();
}



async function start() {
  for (var studentEmpId of list) {
    await openPage(studentEmpId);
	  console.log('Done')
  }
}

//Personal Info

function personalInfo(field) {
  switch (field) {
	case 'empId':
	  return document.querySelector("#CU_SIQSRI_SRCH_EMPLID").innerText;
	case 'fullName':
	  return document.querySelector("#PERSON_NAME_NAME_DISPLAY").innerText.split(' ');
	case 'email1':
	  return document.querySelector("#CU_SIQSRI_EMAIL_EMAIL_ADDR\\$0").innerText;
	case 'email2':
	  const email = document.querySelector("#CU_SIQSRI_EMAIL_EMAIL_ADDR\\$1").innerText;
		  if (email == null || email == '') {
			  email = "No Email Found";
		  }
		  return email;

	case 'otherEmail':
		  const otherEmail = document.getElementById("CU_SIQSRI_EMAIL_EMAIL_ADDR$0")
			if (otherEmail == null || otherEmail == ' '|| otherEmail == undefined) {
				otherEmail = "No Email Found";
			}else{
				return otherEmail.innerText
			}
		  
	case 'phone1':
		  const [p1] = [document.querySelector("#PERSONAL_PHONE_PHONE\\$0").innerText]
		  const phoneList = [p1]
		  try{
			  const p2 = document.querySelector("#PERSONAL_PHONE_PHONE\\$1").innerText 
		  }catch({p2}){
			  if (p2 !== null && p2 !== undefined){
				  phoneList.push(p2)
			  }
		  }
		  return phoneList[0]

		  	

	case 'phone2':
			const [pn1] = [document.querySelector("#PERSONAL_PHONE_PHONE\\$0").innerText]
			const nphoneList = [pn1]
			try{
				const pn2 = document.querySelector("#PERSONAL_PHONE_PHONE\\$1").innerText 
			}catch({pn2}){
				if (pn2 !== null && pn2 !== undefined){
					nphoneList.push(pn2)
				}
			}
			return nphoneList[0]
	default:
	  return 'N/A'; // Handle the case when an invalid field is provided
  }
}

function removeDuplicates(arr) {
	let unique = [];
		arr.forEach(element => {
	  if (!unique.includes(element)) {
		unique.push(element);
	  }
	});
	return unique;
  }

//Service Indicator
function serviceIndicator(key) {


  var indicatorsList = document.querySelector("#CU_SIQSRI_SRVC\\$scroll\\$0 > tbody > tr:nth-child(2) > td > table > tbody").childNodes;
  var indicators = [];

  for (var i = 0; i < indicatorsList.length; i++) {
	if (indicatorsList[i].nodeType === 1) {
	  var indicatorHolder = indicatorsList[i].childNodes[7].innerText;
	  indicators.push(indicatorHolder);
	}
  }

  indicators = removeDuplicates(indicators);

  switch (key) {
	case 'count':
	  return indicators.length;

	case 'recent':
	  var hasRecentIndicators = false; // A flag to check if any recent indicators were found

	  for (var i = 0; i < indicatorsList.length; i++) {
		if (indicatorsList[i].nodeType === 1) {
		  if (indicatorsList[i].childNodes[13].innerText.startsWith('122')) {
			var indicatorHolder = indicatorsList[i].childNodes[7].innerText;
			if (indicatorHolder !== "Description") { // Exclude "Description"
			  indicators.push(indicatorHolder);
			  hasRecentIndicators = true;
			}
		  }
		}
	  }

	  if (hasRecentIndicators) {
		indicators = removeDuplicates(indicators);
		return indicators.join(' '); // Join elements with spaces
	  } else {
		return 'No recent';
	  }

	case 'risk':
	  var hasRiskIndicators = false; // A flag to check if any risk indicators were found

	  for (var i = 0; i < indicatorsList.length; i++) {
		if (indicatorsList[i].nodeType === 1) {
		  if (indicatorsList[i].childNodes[13].innerText.startsWith('122')) {
			var indicatorHolder = indicatorsList[i].childNodes[7].innerText;
			if (indicatorHolder.includes('Do Not Accept Checks', 'Account past due', 'CHBM Collection Agency')) {
			  hasRiskIndicators = true;
			}
		  }
		}
	  }

	  if (hasRiskIndicators) {
		return 'At Risk';
	  } else {
		return 'Safe';
	  }

	default:
	  indicators.shift(); // Remove the first element
	  return indicators.join(' '); // Join elements with spaces
  }
}


//Grades
function countGrades(returnType, compareGrades) {
  const table = document.querySelector("#CU_SIQSRI_ENR\\$scroll\\$0 > tbody > tr:nth-child(3) > td ").childNodes[1].childNodes[1];
  const gradesList = [];

  for (let i = 0; i < table.childNodes.length; i++) { // Use "let" for the loop variable
	if (table.childNodes[i].nodeType == 1) {
	  const grade = table.childNodes[i].childNodes[23].innerText;
	  if (grade !== ' ' && grade !== 'Grade') {
		gradesList.push(grade);
	  }
	}
  }

  switch (returnType) {
	case 'itemCounts':
	  function countItems(list) {
		const itemCounts = {};

		for (const item of list) {
		  if (itemCounts[item]) {
			itemCounts[item] += 1;
		  } else {
			itemCounts[item] = 1;
		  }
		}

		return itemCounts;
	  }

	  const itemCounts = countItems(gradesList);

	  let resultArray = [];
	  for (const grade in itemCounts) {
		resultArray.push(`${grade}:${itemCounts[grade]}`);
	  }

	  return resultArray.join(' '); // Join grade and frequency pairs with spaces

	case 'gradesList':
	  return gradesList.join(' '); // Join grades with spaces

	case 'compareGrades':
	  let nonAPlusToBMinusCount = 0;
	  const totalGrades = gradesList.length;

	  for (const grade of gradesList) {
		if (grade !== 'A+' && grade !== 'A' && grade !== 'A-' && grade !== 'B+' && grade !== 'B') {
		  nonAPlusToBMinusCount += 1;
		}
	  }

	  const percentage = (nonAPlusToBMinusCount / totalGrades) * 100;
	  return percentage + '%';

	case 'countSpecificGrades':
	  const specificGrades = ['WN', 'F', 'FIN', 'INC', 'WU'];
	  const gradeCounts = {};

	  for (const grade of specificGrades) {
		const count = gradesList.filter(item => item === grade).length;
		gradeCounts[grade] = count;
	  }

	  let resultArray2 = [];
	  for (const grade in gradeCounts) {
		resultArray2.push(`${grade}: ${gradeCounts[grade]}`);
	  }

	  return resultArray2.join(' '); // Join specific grade counts with spaces

	case 'riskStatus':
	  const atRiskGrades = ['WN', 'F', 'FIN', 'INC', 'WU'];
	  for (const grade of gradesList) {
		if (atRiskGrades.includes(grade)) {
		  return 'At Risk';
		}
	  }
	  return 'Safe';

	default:
	  return null;
  }
}



async function openPage(studentEmpId) {
  return new Promise((resolve) => {
    // Input ID and hit search button
    var field = document.querySelector("#CU_SIQSRI_SRCH_EMPLID");
    field.value = studentEmpId;
    console.log('Grabbed Student ID');
    performSearch(); // --Try waiting
    console.log('Searching...');

    // Remove ID from todo list
    var index = list.indexOf(studentEmpId);
    if (index > -1) {
      list.splice(index, 1);
    }

    // Save to found list
    setTimeout(function () {
      console.log("Finding data...");

      function retry() {
        if (findInfo() !== null) {
          console.log('Tag found');
          resolve(); // Resolve the promise when the data is found
        } else {
          retry();
        }
      }

      var quickLook = findInfo(studentEmpId,gpaTreshold);
      updateFoundlist(findInfo(studentEmpId,gpaTreshold));
      console.log(quickLook);
      console.log("Found and saved data to 'listFound' list");
    }, 3000);

    setTimeout(function () {
      // Back to the previous page
      backToSearchPage(); // --Try waiting
    }, 3000);
  });
}

//save new info to local storage
function updateFoundlist(object){
	listFound.push(object)
	localStorage.setItem('_listFound',JSON.stringify(listFound))
}

function Person(empId, fname, lname, email1, email2,phone,gpa,minGPA,maxGPA,diffGPA,riskGPA,allSI,countSI,recentSI,riskSI,itemCounts,grades,compareResult,specificGradesCount,riskGrades) {
	this.empId = empId;
    this.fname = fname;
    this.lname = lname;
    this.email1 = email1;
    this.email2 = email2;
	this.phone = phone;
	this.gpa = gpa;
	this.minGPA = minGPA;
	this.maxGPA = maxGPA;
	this.diffGPA = diffGPA;
	this.riskGPA = riskGPA;
	this.allSI = allSI;
	this.countSI = countSI;
	this.recentSI = recentSI;
	this.riskSI = riskSI;
	this.itemCounts = itemCounts;
	this.grades = grades;
	this.compareResult = compareResult;
	this.specificGradesCount = specificGradesCount;
	this.riskGrades = riskGrades;
}

function findInfo(studentID,gpaTreshold) {
	let isFound = false
    try {
		const empId = personalInfo('empId')
        const fullName = personalInfo('fullName')
        const email1 = personalInfo('email1')
        const email2 =personalInfo('email2')
		const phone = personalInfo('phone1') === null ? personalInfo('phone2') : personalInfo('phone1')
		const gpa = cumulativeGPA()
		const minGPA = cumulativeGPA('min')
		const maxGPA = cumulativeGPA('max')
		const diffGPA = cumulativeGPA('diff')
		const riskGPA = cumulativeGPA('risk',gpaTreshold)
		const recentSI = serviceIndicator('recent')
		const allSI = serviceIndicator()	
		const countSI = serviceIndicator('count')
		const riskSI = serviceIndicator('risk')
		const itemCounts = JSON.stringify(countGrades('itemCounts'));
		const grades = JSON.stringify(countGrades('gradesList'));
		const compareResult = countGrades('compareGrades');
		const specificGradesCount = countGrades('countSpecificGrades');
		const riskGrades = countGrades('riskStatus');

		// //Catch if data not found
		// email1 === undefined ? personalInfo('otherEmail') : null
		// email2 === undefined ? personalInfo('otherEmail') : null

		const finds = [Number(empId),fullName[0],fullName[1],email1,email2,phone,gpa,minGPA,maxGPA,diffGPA,riskGPA,allSI,countSI,recentSI,riskSI,itemCounts,grades,compareResult,specificGradesCount,riskGrades]
        const personInfo = new Person(Number(empId),fullName[0],fullName[1],email1,email2,phone,gpa,minGPA,maxGPA,diffGPA,riskGPA,allSI,countSI,recentSI,riskSI,itemCounts,grades,compareResult,specificGradesCount,riskGrades);
		console.log(`Found ${studentID}`);
		const isFound = true
        return personInfo;
    } catch (error) {
        console.log('Error fetching  data:', error.message, `Cound not find ${studentID}`);

    }
	isFound? null : studentsNotFound.push(studentID)
	console.log(`Not Found: ${studentID}`)

}

//GPA calculation

function  cumulativeGPA(key,gpaTreshold){
	
	function termHistoryTermInfoTable(){
		var termHistoryTermInfoTable = document.querySelector("#CU_SIQSRI_SCTRM_\\$scroll\\$0 > tbody > tr:nth-child(3)").childNodes[0].childNodes[1].childNodes[1].childNodes
		return termHistoryTermInfoTable
	}
	switch (key) {
	  case 'diff': //Difference between current and max GPA
		var termHistoryTermInfo = termHistoryTermInfoTable();
		var termInfoCumGpa = [];

		for (var i = 0; i < termHistoryTermInfo.length; i++) {
		  if (termHistoryTermInfo[i].nodeType === 1) {
			var cumulativeGPAholder = termHistoryTermInfo[i].childNodes[23].innerText;
			var cumulativeGPA = Number(cumulativeGPAholder);

			if (cumulativeGPA > 0) {
			  termInfoCumGpa.push(cumulativeGPA);
			}
		  }
		}

		if (termInfoCumGpa.length > 0 && termInfoCumGpa[0] < 0) {
		  termInfoCumGpa.shift();
		}

		termInfoCumGpaMax = Math.max(...termInfoCumGpa)

		return Math.abs(termInfoCumGpa[0] - termInfoCumGpaMax);

	  case 'max': //Maximum GPA from list
		var termHistoryTermInfo = termHistoryTermInfoTable();
		var termInfoCumGpa = [];

		for (var i = 0; i < termHistoryTermInfo.length; i++) {
		  if (termHistoryTermInfo[i].nodeType === 1) {
			var cumulativeGPAholder = termHistoryTermInfo[i].childNodes[23].innerText;
			var cumulativeGPA = Number(cumulativeGPAholder);

			if (cumulativeGPA > 0) {
			  termInfoCumGpa.push(cumulativeGPA);
			}
		  }
		}

		if (termInfoCumGpa.length > 0 && termInfoCumGpa[0] < 0) {
		  termInfoCumGpa.shift();
		}

		termInfoCumGpaMax = Math.max(...termInfoCumGpa)

		return termInfoCumGpaMax;


	  case 'min': //Maximum GPA from list
		var termHistoryTermInfo = termHistoryTermInfoTable();
		var termInfoCumGpa = [];

		for (var i = 0; i < termHistoryTermInfo.length; i++) {
		  if (termHistoryTermInfo[i].nodeType === 1) {
			var cumulativeGPAholder = termHistoryTermInfo[i].childNodes[23].innerText;
			var cumulativeGPA = Number(cumulativeGPAholder);

			if (cumulativeGPA > 0) {
			  termInfoCumGpa.push(cumulativeGPA);
			}
		  }
		}

		if (termInfoCumGpa.length > 0 && termInfoCumGpa[0] < 0) {
		  termInfoCumGpa.shift();
		}

		termInfoCumGpaMax = Math.min(...termInfoCumGpa)

		return termInfoCumGpaMax


	  case 'risk': //At risk GPA 
		var termHistoryTermInfo = termHistoryTermInfoTable();
		var termInfoCumGpa = [];

		for (var i = 0; i < termHistoryTermInfo.length; i++) {
		  if (termHistoryTermInfo[i].nodeType === 1) {
			var cumulativeGPAholder = termHistoryTermInfo[i].childNodes[23].innerText;
			var cumulativeGPA = Number(cumulativeGPAholder);

			if (cumulativeGPA > 0) {
			  termInfoCumGpa.push(cumulativeGPA);
			}
		  }
		}

		if (termInfoCumGpa.length > 0 && termInfoCumGpa[0] < 0) {
		  termInfoCumGpa.shift();
		}

		if ( termInfoCumGpa[0] < gpaTreshold){
			return "At Risk"
		}else{
			return "Safe"
		}		


	  default://GPA
		var termHistoryTermInfo = termHistoryTermInfoTable();
		var termInfoCumGpa = [];

		for (var i = 0; i < termHistoryTermInfo.length; i++) {
		  if (termHistoryTermInfo[i].nodeType === 1) {
			var cumulativeGPAholder = termHistoryTermInfo[i].childNodes[23].innerText;
			var cumulativeGPA = Number(cumulativeGPAholder);

			if (cumulativeGPA > 0) {
			  termInfoCumGpa.push(cumulativeGPA);
			}
		  }
		}

		if (termInfoCumGpa.length > 0 && termInfoCumGpa[0] < 0) {
		  termInfoCumGpa.shift();
		}

		return termInfoCumGpa.length > 0 ? termInfoCumGpa[0] : 'N/A';
	}
}

//Get Status of Lists
function statusData(){
	console.log('Searching: ',list.length)
	console.log('Found: ',listFound.length)
	console.log('Not Found: ',studentsNotFound.length/2)
}


// Save list to local storage and call back

if (localStorage.getItem('_listFound') == null){
	console.log('No previous student list found')
	console.log('Creating new list for found students info..')
	var listFound = [];
	localStorage.setItem('_listFound',JSON.stringify(listFound))
	var listFound = JSON.parse(localStorage.getItem('_listFound'))
}
else{
	console.log('Updating student list..')
	var listFound = JSON.parse(localStorage.getItem('_listFound'))
	console.log('saved..')
}

var forceRedraw = function(element){

if (!element) { return; }

var n = document.createTextNode(' ');
var disp = element.style.display;  // don't worry about previous display style

element.appendChild(n);
element.style.display = 'none';

setTimeout(function(){
	element.style.display = disp;
	n.parentNode.removeChild(n);
},20); // you can play with this timeout to make it as short as possible
}

forceRedraw(field)

if (document.readyState === "complete" || document.readyState === "interactive") {
    // Fully loaded!
	console.log('Lets Start...');
	start()   
}else {
    // Loading still in progress.
    // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.
    window.addEventListener("load", () => {
        // Fully loaded!
		start()
    });
}


