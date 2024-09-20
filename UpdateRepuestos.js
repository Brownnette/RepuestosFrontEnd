window.onload = (event) => {
    const idCategory =getQueryParams('id');
    console.log(idCategory);

};

function getQueryParams(getQueryParams){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};