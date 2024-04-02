//JavaScript code for handling user inputs and displaying details-->
    

let currentStep = 0;
let progressBarWidth = 0;
let progress = 0;

let profileData = {
    "Personal Details": {},
    "Contact Information":{} ,
    "Preferences and Tastes":{} ,
};

let progressPersonal = 0;
let progressContact = 0;
let progressPreferenceaTastes = 0;

let countSkippedPersonal = 0;
let countSkippedContact = 0;
let countSkippedPreferencesTastes = 0;


//Finction to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    
    //Calculate the overrall progress
    if( progress < 3){
        progress = progressPersonal + progressContact + progressPreferenceaTastes   ; 
    }
    
    progressBar.textContent =  progress;

    //Update the progress bar width based on the overall progress
    if(progress === 1){
        progressBarWidth = 33.3
        progressBar.style.width = `${progressBarWidth}%`; 
    }
    else if(progress === 2){
        progressBarWidth = 66.6
        progressBar.style.width = `${progressBarWidth}%`; 
    }
    else {
        progressBarWidth = 100
        progressBar.style.width = `${progressBarWidth}%`;
    }
}


//Function to display prompts for entering personal details
function displayPersonalDetails() {
    const promptPersonalDetails = [
        { category: "Personal Details", prompt: "Your name" },
        { category: "Personal Details", prompt: "Your surname" },
        { category: "Personal Details", prompt: "Your age" },
        { category: "Personal Details", prompt: "Your gender" },
        
    ];

    progressPersonal = 1 ;
    
    if (currentStep < promptPersonalDetails.length) {
        const promptContainer = document.createElement("div");
        promptContainer.classList.add("promptContainer");

        //Create elements for the prompt and input
        const promptContent = document.createElement("div");
        promptContent.classList.add("promptContent");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");

        const nextButton = document.createElement("button");
        nextButton.classList.add("button");

        if(currentStep === 3){
            nextButton.textContent = "Submit";
        }
        else{
            nextButton.textContent = "Next";
        }
        
        
        nextButton.onclick = function() {
            const userInput = promptInput.value;
            if (!userInput) {
                alert("Please enter your answer before proceeding.");
                return;
            }

            //Store user input in profileDta
            profileData[promptPersonalDetails[currentStep].category][promptPersonalDetails[currentStep].prompt] = userInput      ||  ''   ;
            currentStep++;
            promptContainer.remove();
            displayPersonalDetails();
    
        };

        const skipButton = document.createElement("button");
        skipButton.classList.add("button", "skip");
        skipButton.textContent = "Skip";
        skipButton.onclick = function() {
            currentStep++;
            promptContainer.remove();
            displayPersonalDetails();
            countSkippedPersonal+= 1;

        };

        const prevButton = document.createElement("button");
        prevButton.classList.add("button");
        prevButton.textContent = "Previous";
        prevButton.onclick = function() {
            currentStep = Math.max(0, currentStep - 1);
            promptContainer.remove();
            displayPersonalDetails();

        };

        const exitButton = document.createElement("button");
        exitButton.classList.add("button","exit");
        exitButton.textContent = "Exit";
        exitButton.onclick = function() {
            promptContainer.remove();
            currentStep = promptPersonalDetails.length;
            
        };


        //Create input element for user response
        const promptInput = document.createElement("input");
        promptInput.setAttribute("type", "text");
        promptInput.setAttribute("placeholder", "   Enter your answer");
        promptInput.classList.add("inputbox");

        //Display the prompt
        promptContent.textContent = `Step 1 : ${promptPersonalDetails[currentStep].category} | Question ${currentStep + 1} / ${promptPersonalDetails.length} || ${promptPersonalDetails[currentStep].prompt}`;
        
        //Append elements to the prompt container
        promptContainer.appendChild(promptContent);
        promptContainer.appendChild(promptInput);
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(skipButton);
        buttonContainer.appendChild(nextButton);
        buttonContainer.appendChild(exitButton);
        promptContainer.appendChild(buttonContainer);
        
        //Append the prompt container to the document body
        document.body.appendChild(promptContainer);
        
    } else {
        //Update the profile details and progress bar
        updateProfilePersonal();
        updateProgressBar();
    }
}


//Function to update the displayed personal details
function updateProfilePersonal() {
    const detailsOutput = document.getElementById("detailsOutputPersonal");
    detailsOutput.classList.add("outputbox");
    detailsOutput.innerHTML = ""; 
    let profileOutput = '';
    for (const category in profileData) {
        profileOutput += `<p><strong>${category}:</strong></p>`;
        for (const prompt in profileData[category]) {
            profileOutput += `<p><strong>${prompt}:</strong> ${profileData[category][prompt]}</p>`;
        }
    }

    //Check if any question were skipped
    if(countSkippedPersonal < 3){
        detailsOutput.innerHTML = profileOutput;
        alert("Personal Details completed!");
    }
    else{
        alert("You skipped all Questions"); 
    }
}


//Function to initiate entering personal details
function profilePersonalDetails() {
    currentStep = 0;
    profileData = { "Personal Details": {} };
    displayPersonalDetails();
}


//Function to display prompts for entering contact information
function displayContactInformation() {
    const promptContactInformation = [
        { category: "Contact Information", prompt: "Your phone number" },
        { category: "Contact Information", prompt: "Your email address" },
        { category: "Contact Information", prompt: "Preferred Contact Method" },
        { category: "Contact Information", prompt: "Preferred Communication Language"},
    ]

    progressContact = 1 ;

    if (currentStep < promptContactInformation.length) {
        const promptContainer = document.createElement("div");
        promptContainer.classList.add("promptContainer");

        //Create elements for the prompt and input
        const promptContent = document.createElement("div");
        promptContent.classList.add("promptContent");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");

        const nextButton = document.createElement("button");
        nextButton.classList.add("button");
        
        if(currentStep === 3){
            nextButton.textContent = "Submit";
        }
        else{
            nextButton.textContent = "Next";
        }

        nextButton.onclick = function() {
            const userInput = promptInput.value;
            if (!userInput) {
                alert("Please enter your answer before proceeding.");
                return;
            }

            //Store user input in profileDta
            profileData[promptContactInformation[currentStep].category][promptContactInformation[currentStep].prompt] = userInput   || '' ;
            currentStep++;
            promptContainer.remove();
            displayContactInformation();
        };
    

        const skipButton = document.createElement("button");
        skipButton.classList.add("button", "skip");
        skipButton.textContent = "Skip";
        skipButton.onclick = function() {
            currentStep++;
            promptContainer.remove();
            displayContactInformation();
            countSkippedContact+= 1;
        };

        const prevButton = document.createElement("button");
        prevButton.classList.add("button");
        prevButton.textContent = "Previous";
        prevButton.onclick = function() {
            currentStep = Math.max(0, currentStep - 1);
            promptContainer.remove();
            displayContactInformation();
        };

        const exitButton = document.createElement("button");
        exitButton.classList.add("button","exit");
        exitButton.textContent = "Exit";
        exitButton.onclick = function() {
            promptContainer.remove();
            currentStep = promptPersonalDetails.length;
        };

            //Create input element for user response
        const promptInput = document.createElement("input");
        promptInput.setAttribute("type", "text");
        promptInput.setAttribute("placeholder", "   Enter your answer");
        promptInput.classList.add("inputbox");

        //Display the prompt
        promptContent.textContent = `Step 2 : ${promptContactInformation[currentStep].category} | Question ${currentStep + 1} / ${promptContactInformation.length}\n\n${promptContactInformation[currentStep].prompt}`;

        //Append elements to the prompt container
        promptContainer.appendChild(promptContent);
        promptContainer.appendChild(promptInput);
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(skipButton);
        buttonContainer.appendChild(nextButton);
        buttonContainer.appendChild(exitButton);
        promptContainer.appendChild(buttonContainer);


        //Append the prompt container to the document body
        document.body.appendChild(promptContainer);


    } else {
        //Update the profile details and progress bar
        updateProfileContact();
        updateProgressBar();
    }
}

//Function to update the displayed contact information
function updateProfileContact() {
    const detailsOutput = document.getElementById("detailsOutputContact");
    detailsOutput.classList.add("outputbox");
    detailsOutput.innerHTML = ""; 
    let profileOutput = '';
    for (const category in profileData) {
        profileOutput += `<p><strong>${category}:</strong></p>`;
        for (const prompt in profileData[category]) {
            profileOutput += `<p><strong>${prompt}:</strong> ${profileData[category][prompt]}</p>`;
        }
    }

    //Check if any question were skipped
    if(countSkippedContact < 3){
        detailsOutput.innerHTML = profileOutput;
        alert("Contact Information completed!");
    }
    else{
        alert("You skipped all Questions"); 
    }
}


//Function to initiate entering Contact Information
function  profileContactInformation(){
    currentStep = 0;
    profileData = { "Contact Information": {} };
    displayContactInformation();
}

//Function to display prompts for entering preferences and tastes
function displayPreferencesTastes() {
    const promptPreferencesTastes = [
        { category: "Preferences and Tastes", prompt: "Dietary preference"},
        { category: "Preferences and Tastes", prompt: "Cuisine preference" },
        { category: "Preferences and Tastes", prompt: "Cooking expertise" },
        { category: "Preferences and Tastes", prompt: "Health - consciousness" },  
    ];

    progressPreferenceaTastes = 1 ;

    if (currentStep < promptPreferencesTastes.length) {
        const promptContainer = document.createElement("div");
        promptContainer.classList.add("promptContainer");

        //Create elements for the prompt and input
        const promptContent = document.createElement("div");
        promptContent.classList.add("promptContent");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer");

        const nextButton = document.createElement("button");
        nextButton.classList.add("button");
        
        if(currentStep === 3){
            nextButton.textContent = "Submit";
        }
        else{
            nextButton.textContent = "Next";
        }

        nextButton.onclick = function() {
            const userInput = promptInput.value;
            if (!userInput) {
                alert("Please enter your answer before proceeding.");
                return;
            }

            //Store user input in profileDta
            profileData[promptPreferencesTastes[currentStep].category][promptPreferencesTastes[currentStep].prompt] = userInput    || ''  ;
            currentStep++;
            promptContainer.remove();
            displayPreferencesTastes();
        };

        const skipButton = document.createElement("button");
        skipButton.classList.add("button", "skip");
        skipButton.textContent = "Skip";
        skipButton.onclick = function() {
            currentStep++;
            promptContainer.remove();
            displayPreferencesTastes();
            countSkippedPreferencesTastes+= 1;
        };

        const prevButton = document.createElement("button");
        prevButton.classList.add("button");
        prevButton.textContent = "Previous";
        prevButton.onclick = function() {
            currentStep = Math.max(0, currentStep - 1);
            promptContainer.remove();
            displayPreferencesTastes();
        };

        const exitButton = document.createElement("button");
        exitButton.classList.add("button","exit");
        exitButton.textContent = "Exit";
        exitButton.onclick = function() {
            promptContainer.remove();
            currentStep = promptPersonalDetails.length;
            
        };

        //Create input element for user response
        const promptInput = document.createElement("input");
        promptInput.setAttribute("type", "text");
        promptInput.setAttribute("placeholder", "   Enter your answer");
        promptInput.classList.add("inputbox");

            //Display the prompt
        promptContent.textContent = `Step 3 : ${promptPreferencesTastes[currentStep].category} | Question ${currentStep + 1} / ${promptPreferencesTastes.length}\n\n${promptPreferencesTastes[currentStep].prompt}`;
        
        //Append elements to the prompt container
        promptContainer.appendChild(promptContent);
        promptContainer.appendChild(promptInput);
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(skipButton);
        buttonContainer.appendChild(nextButton);
        buttonContainer.appendChild(exitButton);
        promptContainer.appendChild(buttonContainer);


        //Append the prompt container to the document body
        document.body.appendChild(promptContainer);
        

    } else {
        //Update the profile details and progress bar
        updatePreferncesTastes();
        updateProgressBar();
    }
}


//Function to update the displayed preferences and Tastes
function updatePreferncesTastes() {
    const detailsOutput = document.getElementById("detailsOutputPreferencesTastes");
    detailsOutput.classList.add("outputbox");
    detailsOutput.innerHTML = ""; 
    let profileOutput = '';
    for (const category in profileData) {
        profileOutput += `<p><strong>${category}:</strong></p>`;
        for (const prompt in profileData[category]) {
            profileOutput += `<p><strong>${prompt}:</strong> ${profileData[category][prompt]}</p>`;
        }
    }

    //Check if any question were skipped
    if(countSkippedPreferencesTastes < 3){
        detailsOutput.innerHTML = profileOutput;
        alert("Preferences and Tastes details completed!");
    }
    else{
        alert("You skipped all Questions"); 
    }
}


//Function to initiate entering Preferences and Tastes
function  profilePreferencesTaste(){
    currentStep = 0;
    profileData = { "Preferences and Tastes": {} };
    displayPreferencesTastes();
}

    