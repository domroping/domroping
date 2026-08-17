/**
 * Common JavaScript - Menu Mobile Corrigido
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
});

function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const navClose = document.getElementById("navClose");
    const navOverlay = document.getElementById("navOverlay");

    if (!menuToggle || !mainNav) return;

    // Função centralizada para abrir/fechar o menu
    function setOpen(open) {
        mainNav.classList.toggle("is-open", open);
        menuToggle.classList.toggle("is-open", open);
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");

        if (navOverlay) {
            navOverlay.classList.toggle("is-open", open);
        }

        if (open) {
            document.body.classList.add("nav-open");
        } else {
            document.body.classList.remove("nav-open");
        }
    }

    // Clique no botão hambúrguer / 3 pontos
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = mainNav.classList.contains("is-open");
        setOpen(!isOpen);
    });

    // Clique no botão fechar (X)
    if (navClose) {
        navClose.addEventListener("click", (e) => {
            e.stopPropagation();
            setOpen(false);
        });
    }

    // Clique fora do menu (overlay)
    if (navOverlay) {
        navOverlay.addEventListener("click", () => {
            setOpen(false);
        });
    }

    // Suporte a fechamento ao pressionar a tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
            setOpen(false);
        }
    });

    // Resetar estado se a tela for redimensionada para desktop (> 980px)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            setOpen(false);
        }
    });

    // Lógica para submenus (Dropdowns) no Mobile
    const dropdownBtns = document.querySelectorAll(".nav__item--dropdown > .nav__link");
    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (window.innerWidth <= 980) {
                e.preventDefault();
                const parentItem = btn.parentElement;
                parentItem.classList.toggle("is-active");
            }
        });
    });
}
