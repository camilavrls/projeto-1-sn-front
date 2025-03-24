import styles from "./page.module.css";

// Define a interface para os dados do usuário
interface UserData {
  nome: string;
  idade: number;
  estadoCivil: string;
}

// Função assíncrona para buscar os dados do servidor
async function fetchUserData(): Promise<UserData> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://54.145.45.4:8080/data";

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os dados: ${response.status}`);
  }

  return response.json();
}

export default async function Home() {
  let userData: UserData | null = null;
  let errorMessage: string | null = null;

  try {
    userData = await fetchUserData();
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Erro desconhecido";
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Informações do Usuário</h1>
        {errorMessage && <p>{errorMessage}</p>}
        {userData ? (
          <div>
            <p>
              <strong>Nome:</strong> {userData.nome}
            </p>
            <p>
              <strong>Idade:</strong> {userData.idade}
            </p>
            <p>
              <strong>Estado Civil:</strong> {userData.estadoCivil}
            </p>
          </div>
        ) : (
          <p>Não foi possível carregar os dados.</p>
        )}
      </main>
      <footer className={styles.footer}>
        <p>Exemplo de conexão Front-end com Back-end</p>
      </footer>
    </div>
  );
}
