export default async function Page({ params }) {
  // O SEGREDO ESTÁ NESTA LINHA:
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  console.log("Agora o username é:", username); 

  const url = process.env.DATABASE_URL;
  // ... resto do código
  
  if (!url) {
    return <div className="text-white p-10">Erro: DATABASE_URL não encontrada no servidor!</div>;
  }

  try {
    const sql = neon(url);
    
    // Busca exata (usando LOWER para evitar erro de maiúsculas/minúsculas)
    const rows = await sql`SELECT * FROM perfis WHERE LOWER(username) = LOWER(${username})`;
    
    if (rows.length === 0) {
      return (
        <div className="text-white p-10 font-mono">
          <h1 className="text-red-500">Usuário "{username}" não encontrado.</h1>
          <p className="mt-4 text-gray-400">Dica: No seu Neon, o username está exatamente como "{username}"?</p>
          <p className="mt-2 text-xs opacity-30 text-white">DB_URL detectada: {url.substring(0, 20)}...</p>
        </div>
      );
    }

    const user = rows[0];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 max-w-sm w-full text-center">
          <h1 className="text-3xl font-bold">{user.nome}</h1>
          <p className="text-gray-400 mt-2">{user.bio}</p>
          <div className="mt-6 space-y-4">
            {user.links && user.links.map((link, i) => (
              <a key={i} href={link.url} className="block w-full py-3 bg-white text-black rounded-xl font-bold">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return <div className="text-white p-10">Erro no banco: {e.message}</div>;
  }
}