    
    <template>
    <footer class="footer">
        <div class="footer-text">
            <p>Copyright &copy; | All Rights Reserved.</p>
        </div>

        <div class="social-media">
            <a href="https://www.facebook.com/?locale=es_ES" target="_blank"><i class='bx bxl-facebook'></i></a>
            <a href="https://twitter.com/?lang=es" target="_blank"><i class='bx bxl-twitter'></i></a>
            <a href="https://www.instagram.com/" target="_blank"><i class='bx bxl-instagram-alt'></i></a>
            <a href="https://www.linkedin.com/hp" target="_blank"><i class='bx bxl-linkedin'></i></a>
        </div>

        <div class="footer-iconTop">
            <a href="#home"><i class='bx bx-up-arrow-alt'></i></a>
        </div>
    </footer>
    </template>

    <script>
    import { RouterLink } from 'vue-router'

    export default {
        name: 'Footer',
    }
    </script>

   <style scoped>
    .footer {
        position: absolute;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 1rem 9%;
        background: var(--second-bg-color);
        z-index: 100; /* Asegúrate de que el footer esté sobre el contenido */
    }

    .footer-text p {
        font-size: 1.2rem;
        color: white;
    }

    .footer-iconTop a {
        text-decoration: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: .3rem;
        background: var(--main-color);
        border-radius: .8rem;
        transition: .5s ease;
    }

    .footer-iconTop a:hover {
        box-shadow: 0 0 1rem var(--main-color);
    }

    .footer-iconTop a i {
        font-size: 2rem;
        color: var(--second-bg-color);
    }

    .social-media a{
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: .2rem solid var(--main-color);
    border-radius: 50%;
    font-size: 1rem;
    color: var(--main-color);
    margin: 2rem 1rem 2rem 0;
    transition: .5s ease;
}

.social-media a:hover{
    background: var(--main-color);
    color: var(--second-bg-color);
    box-shadow: 0 0 1rem var(--main-color);
}
</style>
