"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

// Define a interface para os dados do usuário
interface UserData {
  nome: string;
  idade: number;
  estadoCivil: string;
}

export default function Home() {
  // Tipagem explícita para os estados
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Endereço da API: pode ser configurado via variável de ambiente ou alterado diretamente
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://seu-endereco-da-api.com/endpoint";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erro ao buscar os dados: ${response.status}`);
        }
        // Define explicitamente que os dados retornados seguem a interface UserData
        const data: UserData = await response.json();
        setUserData(data);
      } catch (err) {
        // Verifica se o erro é do tipo Error
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Erro desconhecido"));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Informações do Usuário</h1>
        {loading && <p>Carregando...</p>}
        {error && <p>{error.message}</p>}
        {userData && (
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
        )}
      </main>
      <footer className={styles.footer}>
        <p>Exemplo de conexão Front-end com Back-end</p>
      </footer>
    </div>
  );
}
