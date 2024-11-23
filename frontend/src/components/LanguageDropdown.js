import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
    const { i18n } = useTranslation("homepage");
    const [selectedLanguage, setSelectedLanguage] = useState({
        lang: "fi",
        label: "Finnish",
        flag: "https://flagcdn.com/w40/fi.png",
    });

    const languages = [
        {
            lang: "en",
            label: "English",
            flag: "https://flagcdn.com/w40/gb.png",
        },
        {
            lang: "fi",
            label: "Finnish",
            flag: "https://flagcdn.com/w40/fi.png",
        },
    ];

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        console.log("Selected Language:", language.lang); // Optional: Add further logic here
        i18n.changeLanguage(language.lang);
    };

    return (
        <div className="dropdown">
            <button
                className="btn language-change dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={selectedLanguage.flag}
                    alt={selectedLanguage.label}
                    width="24"
                    className="me-1"
                />
                {selectedLanguage.label}
            </button>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="languageDropdown"
            >
                {languages.map((language) => (
                    <li key={language.lang}>
                        <button
                            className="dropdown-item d-flex align-items-center logout"
                            onClick={() => handleLanguageChange(language)}
                        >
                            <img
                                src={language.flag}
                                alt={language.label}
                                width="24"
                                className="me-2"
                            />
                            {language.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageDropdown;
