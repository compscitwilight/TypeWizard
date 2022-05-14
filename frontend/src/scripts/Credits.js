const ContributorsJSON = "/config/contributors"
const ContributorsLi = document.querySelector("#contributors")

$.getJSON(ContributorsJSON).done((data) => {
    $.each(data, (i, v) => {
        const credit = document.createElement("li")
        credit.innerHTML = v
        ContributorsLi.appendChild(credit)
    })
})