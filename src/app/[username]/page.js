export const revalidate = 0; // Isso desativa o cache e força o banco a ser consultado em todo refresh
import { neon } from '@neondatabase/serverless';

export default async function Page({ params }) {
  const { username } = params;
  
  // Conecta ao Neon usando a variável que já está no seu .env
  const sql = neon(process.env.DATABASE_URL);
  
  // Busca o perfil no banco
  const rows = await sql`SELECT * FROM perfis WHERE username = ${username}`;
  const user = rows[0];

  if (!user) {
    return <div className="text-white text-center mt-20">Usuário não encontrado :(</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-2">{user.nome}</h1>
        <p className="text-gray-400 mb-6">{user.bio}</p>
        
        <div className="space-y-4">
          {user.links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank"
              className="block w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}