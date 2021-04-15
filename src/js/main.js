document.addEventListener("DOMContentLoaded", () => {
    const addHeaderShadow = () => {
        const header = document.querySelector(".header");
        document.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop > 0 && !header.classList.contains("header--dark")) {
                header.classList.add("header--dark");
            } else if (document.documentElement.scrollTop === 0) {
                header.classList.remove("header--dark");
            }
        });
    };

    const toggleCurrency = () => {
        const labels = document.querySelectorAll(".prices__input-panel-currency-item label");

        labels.forEach(label => {
            label.addEventListener("click", e => {
                labels.forEach(item => {
                    item.classList.remove("prices__input-panel-currency-label--activ");
                    if (item === e.target) {
                        item.classList.add("prices__input-panel-currency-label--activ");
                    }
                });
            });
        });
    };

    const tableServices = () => {
        const totalSum = document.querySelector(".prices__resume-total-sum span");
        let tableTotal = 0;

        document.querySelectorAll(".prices__table-row").forEach(item => {
            //Обработчина на ряд в таблице
            item.addEventListener("click", e => {
                if (e.target.parentNode.classList.contains("prices__table-row-cell")) {
                    const clickedSpan = e.target;
                    const clickedPrice = +clickedSpan.innerHTML.replace(/\D/gm, ""); // get price from span content
                    const clickedInput = clickedSpan.nextElementSibling;
                    const inputName = clickedInput.getAttribute("name");
                    const clickedInputGroup = document.querySelectorAll(`[name="${inputName}"]`);
                    let rowPrice = clickedPrice;
                    let prevPrice = 0;

                    //Получить актуальную цену из ряда
                    clickedInputGroup.forEach(item => {
                        if (item.classList.contains("inTotal")) {
                            prevPrice = +item.previousSibling.innerHTML.replace(/\D/g, "");
                            rowPrice = clickedPrice - prevPrice;
                        }

                        item.classList.remove("inTotal");
                        item.parentNode.classList.remove("prices__table-row-cell--activ");

                        if (item.checked === true && item === clickedInput) {
                            // Который был отмечен уже. Повторный клик по отмеченному
                            tableTotal -= clickedPrice;
                            item.checked = false;
                            item.classList.remove("inTotal");
                        } else if (item === clickedInput) {
                            //Новоотмеченный
                            item.checked = true;
                            item.classList.add("inTotal");
                            item.parentNode.classList.add("prices__table-row-cell--activ");
                        }
                    });
                    tableTotal += rowPrice;
                    totalSum.textContent = tableTotal;
                }
            });
        });
    };
    addHeaderShadow();
    toggleCurrency();
    tableServices();
});
