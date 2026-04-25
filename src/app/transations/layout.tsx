export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <header>
                <h1>Home Layout
                </h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
            </footer>
        </div>
    );
}