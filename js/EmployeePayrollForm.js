window.addEventListener('DOMContentLoaded', (event) =>{
    //Salary Range
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
    output.textContent=name.value;
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