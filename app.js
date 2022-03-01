const mobileContainer = document.getElementById('mobile-container');
const mobileDetailContainer = document.getElementById('mobile-detail');
const displayMobileDiv = document.getElementById('display-mobile-container');
const textContent = document.getElementById('text-content');
const errorContainer = document.getElementById('error-msg');
//SPINNER FUNCTION:
const loadSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const displayMobileContainer = displayStyle => {
    displayMobileDiv.style.display = displayStyle;
}
const displayMobileDetailDiv = displayStyle => {
    mobileDetailContainer.style.display = displayStyle;
}
const displayTextContent = displayStyle => {
        textContent.style.display = displayStyle;
    }
    // LOADING ALL MOBILE:
const loadMobiles = () => {
    const searchInput = document.getElementById('search-input').value;
    loadSpinner('block');
    displayMobileContainer('none');
    displayMobileDetailDiv('none');
    displayTextContent('none');

    //  EMPTY CONDITION:
    if (searchInput.length == 0) {
        const div = document.createElement('div');
        const h5 = document.createElement('h5');
        h5.innerText = 'Please Write Mobile or Watch Name!';
        div.appendChild(h5);
        errorContainer.appendChild(div);
        loadSpinner('none');
    } else {
        //  FETCH DATA FROM API:
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMobile(data.data))
    }
}

// SEARCHING MOBILE:
const displayMobile = mobiles => {
    // CLEAR CONTENT
    mobileContainer.textContent = '';
    mobileDetailContainer.textContent = '';
    errorContainer.textContent = '';
    console.log(mobiles.length)

    // RESULT NOT FOUND CONDITION:
    if (mobiles.length == 0) {
        const div = document.createElement('div');
        const h5 = document.createElement('h5');
        h5.innerText = 'Sorry!  Result Not Found';
        div.appendChild(h5);
        errorContainer.appendChild(div);
        loadSpinner('none');
    } else {
        mobiles.slice(0, 20).forEach((mobile) => {
            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
                        <div class="h-100 pb-3 card-material">
                                <div class="img text-center pt-5">
                                        <img src="${mobile.image}" class="img-fluid" alt="...">
                                </div>
                                <div class="card-body mt-3">
                                        <h5 class="card-title brand-color fw-bold">${mobile.phone_name}</h5>
                                        <div class="d-flex justify-content-between mt-4">
                                                <div>
                                                        <h6 class="text-white mt-1">Brand: ${mobile.brand}</h6>
                                                </div>
                                                <div>
                                                        <button onclick="loadPhoneDetail('${mobile.slug}')" type="button" class="btn brand-btn fw-bolder">Explore More</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        `;
            mobileContainer.appendChild(div);
            loadSpinner('none');
            displayMobileContainer('block');
        })
    }
}

// LOADING DETAILS FOR MOBILE :
const loadPhoneDetail = mobile => {
    console.log(mobile)
    displayMobileContainer('none');
    displayMobileDetailDiv('none');
    loadSpinner('block');
    const url = `https://openapi.programming-hero.com/api/phone/${mobile}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log()
            displayMobileDetail(data.data, data.data.mainFeatures.sensors)
        })
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
}

// DISPLAYING FOR MOBILE DETAILS :
const displayMobileDetail = (mobile, sensors) => {
    displayMobileDetailDiv('none');
    console.log(mobile)
    mobileDetailContainer.textContent = '';

    const informationDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const featuresDiv = document.createElement('div');
    const othersDiv = document.createElement('div');
    const sensorsDiv = document.createElement('div');
    const ul = document.createElement('ul');

    //  IMAGE INNER HTML:
    imgDiv.innerHTML = `
                        <div class="detail-img d-flex align-items-center justify-content-center h-100">
                                <img class="img-fluid" src="${mobile.image}" alt="">
                        </div>
        `;
    // MAIN :
    featuresDiv.innerHTML = `
        <div class="ps-4 pe-4 pt-4">
                <h4 class="brand-color fw-bold">${mobile.name}</h4>
                <p class="fw-bolder text-white">${mobile.releaseDate ? mobile.releaseDate : "Release Date Not Found"}</p>
                <h2 class="fw-bold"> <span class="brand-color">${mobile.brand}</span> <span class="text-white">Brand</span></h2>
                <h3 class="brand-color mt-4 fw-bold">Main Features:</h3>
                <div class="ps-5 mt-4">
                        <h6 class="text-white">ChipSet: <span class="fw-normal">${mobile.mainFeatures.chipSet ? mobile.mainFeatures.chipSet : 'Not Found'}</span></h6>
                        <h6 class="text-white">Display Size: <span class="fw-normal">${mobile.mainFeatures.displaySize ? mobile.mainFeatures.displaySize : 'Not Found'}</span></h6>
                        <h6 class="text-white">Memory: <span class="fw-normal">${mobile.mainFeatures.memory ? mobile.mainFeatures.memory : 'Not Found'}</span></h6>
                </div>    
                <h4 class="brand-color fw-bold mt-4">Sensors:</h4>
        </div>
        `
    informationDiv.appendChild(featuresDiv);

    // SENSORS:
    sensorsDiv.classList.add('ps-4');
    sensorsDiv.classList.add('text-white');
    sensors.forEach(sensor => {
        const li = document.createElement('li');
        li.classList.add('ms-5');
        li.innerText = `${sensor}`;
        ul.appendChild(li);
    })
    sensorsDiv.appendChild(ul);
    informationDiv.appendChild(sensorsDiv);

    // OTHERS :
    othersDiv.innerHTML = `
                <div class="ps-4">
                        <h4 class="brand-color mt-4 fw-bold">Others:</h4>
                        <div class="ps-5">
                                <h6 class="text-white">Bluetooth: <span class="fw-normal">${mobile?.others?.Bluetooth ? mobile.others.Bluetooth : 'Not Found'}</span></h6>
                                <h6 class="text-white">GPS: <span class="fw-normal">${mobile?.others?.GPS ? mobile.others.GPS : 'Not Found'}</span></h6>
                                <h6 class="text-white">NFC: <span class="fw-normal">${mobile.others?.NFC ? mobile.others.NFC : 'Not Found'}</span></h6>
                                <h6 class="text-white">Radio: <span class="fw-normal">${mobile?.others?.Radio ? mobile.others.Radio : 'Not Found'}</span></h6>
                                <h6 class="text-white">USB: <span class="fw-normal">${mobile?.others?.USB ? mobile.others.USB : 'Not Found'}</span></h6>
                                <h6 class="text-white">WLAN: <span class="fw-normal">${mobile?.others?.WLAN ? mobile.others.WLAN : 'Not Found'}</span></h6>
                        </div>
                </div>
        `
    informationDiv.appendChild(othersDiv);

    // APPEND:
    mobileDetailContainer.appendChild(imgDiv);
    mobileDetailContainer.appendChild(informationDiv);
    loadSpinner('none');
    displayMobileDetailDiv('block');
    displayMobileContainer('block');
}