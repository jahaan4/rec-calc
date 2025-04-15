// JavaScript for KRUTr Calculator Pro

// Dark mode toggle
const toggleBtn = document.getElementById('toggle-dark-mode');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Margin slider updates
const marginSliders = [
    {slider: 'calc1_margin_slider', display: 'calc1_margin_val', input: 'calc1_margin_input'},
    {slider: 'calc2_margin_slider', display: 'calc2_margin_val', input: 'calc2_margin_input'}
];

marginSliders.forEach(({slider, display, input}) => {
    const s = document.getElementById(slider);
    const d = document.getElementById(display);
    const i = document.getElementById(input);
    s.addEventListener('input', () => {
        d.textContent = s.value;
        i.value = s.value;
    });
    i.addEventListener('input', () => {
        s.value = i.value;
        d.textContent = i.value;
    });
});

// Color change for Result Area

function colorChangeResult() 
    {
        const color = document.getElementById("result").style.boxShadow = `0 0 10px rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 10)`;
    console.log(color)
    }

    // Code to Disable the Desired MArgin Sliders and Input  in case Markup is entered 

    const calc1Markup = document.getElementById('calc1_markup');
    const calc2Markup = document.getElementById('calc2_markup');

    calc1Markup.addEventListener('input', function() {
        const calc1Markup = document.getElementById('calc1_markup').value;
    if (parseFloat(calc1Markup) == 0 || calc1Markup == "" || calc1Markup == null || calc1Markup == undefined) 
        {

            document.getElementById("calc1_margin_slider").disabled = false;
            document.getElementById("calc1_margin_input").disabled = false;
        }
        else 
        {
            document.getElementById("calc1_margin_slider").disabled = true;
            document.getElementById("calc1_margin_input").disabled = true;
        }
    });

    calc2Markup.addEventListener('input', function() {
        const calc2Markup = document.getElementById('calc2_markup').value;
    if (parseFloat(calc2Markup) == 0 || calc2Markup == "" || calc2Markup == null || calc2Markup == undefined) 
        {

            document.getElementById("calc2_margin_slider").disabled = false;
            document.getElementById("calc2_margin_input").disabled = false;
        }
        else 
        {
            document.getElementById("calc2_margin_slider").disabled = true;
            document.getElementById("calc2_margin_input").disabled = true;
        }
    });

// Function to calculate Loaded BR 
function findLoadedBR(mBR, disc, msp) {
    let loadedBR = parseFloat(mBR) - ((parseFloat(disc) / 100)*parseFloat(mBR)) - ((parseFloat(msp) / 100)*parseFloat(mBR));
    console.log("Loaded BR: " + loadedBR);
    return loadedBR;
}

// Function to calculate Loaded PR - Calculator 1 with MArgin option
function findC1wMarginLoadedPR(loadedBR, desiredMargin) {

    let loadedPR = parseFloat(loadedBR) - parseFloat(desiredMargin);
    console.log("Loaded PR: " + loadedPR);
    return loadedPR;
}

// Function to calculate Max Pay Rate - Calculator 1 with MArgin option
function findC1wMarginMaxPR(loadedPR, load) {
    let maxPR = parseFloat(loadedPR) / (1 + (parseFloat(load) / 100));
    console.log("Max PR: " + maxPR);
    return maxPR;
}


// Function to calculate Loaded PR - Calculator 1 with Markup option
function findC1wMarkupLoadedPR(maxPR, load) {

    let loadedPR = parseFloat(maxPR) * (1 + (parseFloat(load) / 100));
    console.log("Loaded PR: " + loadedPR);
    return loadedPR;
}

// Function to calculate Max Pay Rate - Calculator 1 with Markup option
function findC1wMarkupMaxPR(loadedBR, markup) {
    let maxPR = parseFloat(loadedBR) / (1 + (parseFloat(markup) / 100));
    console.log("Max PR: " + maxPR);
    return maxPR;
}

// Function to calculate MArgin - Calculator 1 with Markup option
function findMargin(loadedBR, loadedPR) {
    let margin = parseFloat(loadedBR) - parseFloat(loadedPR);
    console.log("Margin: " + margin);
    return margin;
}

// Function to calculate Loaded PR - Calculator 2
function findLoadedPR(payRate, load) {
    let loadedPR = parseFloat(payRate) * (1 + (parseFloat(load) / 100));
    console.log("Loaded PR: " + loadedPR);
    return loadedPR;
}

function findC2wMkupBR(candPR, markup) {
    let c2BR = parseFloat(candPR) * (1 + (parseFloat(markup) / 100));
    console.log("C2 BR: " + c2BR);
    return c2BR;
}

function findC2wMarginBR(loadedPR, margin) {
    let c2BR = parseFloat(loadedPR) + parseFloat(margin);
    console.log("C2 BR: " + c2BR);
    return c2BR;
}

// Placeholder functions for calculate buttons
document.getElementById('calc1_calculate').addEventListener('click', () => {
    // collect and validate inputs
    console.log("Calculator 1 Calculate clicked");
    colorChangeResult();

    const mBR = document.getElementById('calc1_billRate').value;
    const disc = document.getElementById('calc1_discount').value;
    const msp = document.getElementById('calc1_msp').value;
    const load = document.getElementById('calc1_load').value;
    const markup = document.getElementById('calc1_markup').value;
    const margin = document.getElementById('calc1_margin_input').value;

    if (mBR === "" || disc === "" || msp === "" || load === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (isNaN(mBR) || isNaN(disc) || isNaN(msp) || isNaN(load) || isNaN(markup)) {
        alert("Please enter valid numbers.");
        return;
    }
    if (parseFloat(disc) < 0 || parseFloat(disc) > 100) {
        alert("Discount must be between 0 and 100.");
        return;
    }
    if (parseFloat(load) < 0 || parseFloat(load) > 100) {
        alert("Load must be between 0 and 100.");
        return;
    }
    if (parseFloat(markup) < 0 || parseFloat(markup) > 100) {
        alert("Markup must be between 0 and 100.");
        return;
    }
    if (parseFloat(msp) < 0) {
        alert("MSP Fees must be a positive number.");
        return;
    }
    if (parseFloat(mBR) < 0) {
        alert("Bill Rate must be a positive number.");
        return;
    }

    if (parseFloat(markup) == 0 || markup == "" || markup == null || markup == undefined) 
        {
            const loadedBR = findLoadedBR(mBR, disc, msp);
            const loadedPR = findC1wMarginLoadedPR(loadedBR, margin);
            const maxPR = findC1wMarginMaxPR(loadedPR, load);
            // Display results in the result area
            document.getElementById('result').innerHTML = `Loaded Bill Rate: ${loadedBR}<br>Loaded Pay Rate: ${loadedPR}<br>Max Pay Rate: ${maxPR}`;
            document.getElementById('result').style.display = "block";

        }
        else 
        {
            const loadedBR = findLoadedBR(mBR, disc, msp);
            const maxPR = findC1wMarkupMaxPR(loadedBR, markup);
            const loadedPR = findC1wMarkupLoadedPR(maxPR, load);
            const margin = findMargin(loadedBR, loadedPR);
            // Display results in the result area
            document.getElementById('result').innerHTML = `Loaded Bill Rate: ${loadedBR}<br>Loaded Pay Rate: ${loadedPR}<br>Max Pay Rate: ${maxPR}<br>Margin: ${margin}`;
            document.getElementById('result').style.display = "block";
        }    
});

document.getElementById('calc2_calculate').addEventListener('click', () => {
    // collect and validate inputs
    console.log("Calculator 2 Calculate clicked");
    colorChangeResult();

    const candPR = document.getElementById('calc2_payRate').value;
    const mBR = document.getElementById('calc2_billRate').value;
    const disc = document.getElementById('calc2_discount').value;
    const msp = document.getElementById('calc2_msp').value;
    const load = document.getElementById('calc2_load').value;
    const markup = document.getElementById('calc2_markup').value;
    const margin = document.getElementById('calc2_margin_input').value;

    if (candPR === "" || mBR === "" || disc === "" || msp === "" || load === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (isNaN(candPR) || isNaN(mBR) || isNaN(disc) || isNaN(msp) || isNaN(load) || isNaN(markup)) {
        alert("Please enter valid numbers.");
        return;
    }
    if (parseFloat(disc) < 0 || parseFloat(disc) > 100) {
        alert("Discount must be between 0 and 100.");
        return;
    }
    if (parseFloat(load) < 0 || parseFloat(load) > 100) {
        alert("Load must be between 0 and 100.");
        return;
    }
    if (parseFloat(markup) < 0 || parseFloat(markup) > 100) {
        alert("Markup must be between 0 and 100.");
        return;
    }

    if (parseFloat(markup) == 0 || markup == "" || markup == null || markup == undefined) 
        {
            const loadedPR = findLoadedPR(candPR, load);
            const loadedBR = findLoadedBR(mBR, disc, msp);
            const c2BR = findC2wMarginBR(loadedPR, margin);
            if (c2BR > loadedBR) {
                // Display results in the result area
                document.getElementById('result').innerHTML = `Loaded Pay Rate: ${loadedPR}<br>Max Bill Rate: ${mBR}<br>Loaded Bill Rate: ${loadedBR}<br>Candidate Bill Rate: ${c2BR}<br>Candidate Bill Rate Exceeds the Loaded Bill Rate, this is unacceptable. Candidate Pay Rate / Margin is too high for the given Bill Rate. Please decrease either.`;
                document.getElementById('result').style.display = "block";
                alert("Candidate Bill Rate Exceeds the Loaded Bill Rate, this is unacceptable. Candidate Pay Rate / Margin is too high for the given Bill Rate. Please decrease either.");
                return;
            }
            else{
                // Display results in the result area
                document.getElementById('result').innerHTML = `Loaded Pay Rate: ${loadedPR}<br>Max Bill Rate: ${mBR}<br>Loaded Bill Rate: ${loadedBR}<br>Candidate Bill Rate: ${c2BR}`;
                document.getElementById('result').style.display = "block";  
            }

        }
    
});

document.getElementById('calc3_calculate').addEventListener('click', () => {
    // collect and validate inputs
    console.log("Calculator 3 Calculate clicked");
    colorChangeResult();
    const candPR = document.getElementById('calc3_payRate').value;
    const candBR = document.getElementById('calc3_billRate').value;
    const disc = document.getElementById('calc3_discount').value;
    const msp = document.getElementById('calc3_msp').value;
    const load = document.getElementById('calc3_load').value;

    if (candPR === "" || candBR === "" || disc === "" || msp === "" || load === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (isNaN(candPR) || isNaN(candBR) || isNaN(disc) || isNaN(msp) || isNaN(load)) {
        alert("Please enter valid numbers.");
        return;
    }
    if (parseFloat(disc) < 0 || parseFloat(disc) > 100) {
        alert("Discount must be between 0 and 100.");
        return;
    }
    if (parseFloat(load) < 0 || parseFloat(load) > 100) {
        alert("Load must be between 0 and 100.");
        return;
    }
    if (parseFloat(candBR) < 0) {
        alert("Bill Rate must be a positive number.");
        return;
    }
    if (parseFloat(candPR) < 0) {
        alert("Pay Rate must be a positive number.");
        return;
    }

    const loadedPR = findLoadedPR(candPR, load);
    const loadedBR = findLoadedBR(candBR, disc, msp);
    const margin = findMargin(loadedBR, loadedPR);
    console.log("Margin: " + margin);

    //Display results in the result area
    document.getElementById('result').innerHTML = `Loaded Pay Rate: ${loadedPR}<br>Loaded Bill Rate: ${loadedBR}<br>Margin: ${margin}`;
    document.getElementById('result').style.display = "block";

});

// Download preset as JSON
document.getElementById('download-preset').addEventListener('click', () => {
    const preset = {
        client: document.getElementById('preset_client').value,
        markup: document.getElementById('preset_markup').value,
        discount: document.getElementById('preset_discount').value,
        msp: document.getElementById('preset_msp').value,
        load: document.getElementById('preset_load').value
    };
    const blob = new Blob([JSON.stringify(preset, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.client}_preset.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// Upload preset JSON and populate values
document.getElementById('upload_json').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const preset = JSON.parse(reader.result);
        document.getElementById('preset_client').value = preset.client || "";
        document.getElementById('preset_markup').value = preset.markup || "";
        document.getElementById('preset_discount').value = preset.discount || "";
        document.getElementById('preset_msp').value = preset.msp || "";
        document.getElementById('preset_load').value = preset.load || "";

        document.getElementById('calc1_markup').value = preset.markup || "";
        document.getElementById('calc1_discount').value = preset.discount || "";
        document.getElementById('calc1_msp').value = preset.msp || "";
        document.getElementById('calc1_load').value = preset.load || "";
        
        document.getElementById('calc2_markup').value = preset.markup || "";
        document.getElementById('calc2_discount').value = preset.discount || "";
        document.getElementById('calc2_msp').value = preset.msp || "";
        document.getElementById('calc2_load').value = preset.load || "";
    
        document.getElementById('calc3_discount').value = preset.discount || "";
        document.getElementById('calc3_msp').value = preset.msp || "";
        document.getElementById('calc3_load').value = preset.load || "";


        alert("Preset loaded!");
    };
    reader.readAsText(file);
});