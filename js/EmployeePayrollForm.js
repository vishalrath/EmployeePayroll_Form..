  //The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
  // without waiting for stylesheets, images, and subframes to finish loading.

  //The addEventListener() method attaches an event handler to an element without overwriting existing event handlers

  //You can add event listeners to any DOM object not only HTML elements. i.e the window object.
window.addEventListener('DOMContentLoaded', (event) =>{
    //Salary Range
    //The Document method querySelector() returns the first Element within the document that matches
    //the specified selector, or group of selectors. If no matches are found, null is returned.
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() 
    {
        output.textContent = salary.value;
    });

    //name validation
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
});

const save = () => {
    try 
    {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } 
    catch (e) 
    {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try 
    {
        employeePayrollData.name = getInputValueById('#name');
    } 
    catch (e) 
    {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.start_date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
  // 
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}
    // featching the detail or input value by using id using getInputValueById
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(employeePayrollData) {
    //Json object that provides functions to convert JavaScript values to 
    //and from the JavaScript Object Notation (JSON) format
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    // stringify means Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    // ForEach Performs the specified action for each node in an list.
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    //Returns the first element that is a descendant of node that matches selectors.
    const element = document.querySelector(id);
    element.value = value;
}