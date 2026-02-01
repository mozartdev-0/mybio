import { neon } from '@neondatabase/serverless';

export const revalidate = 0;

export default async function Page({ params }) {
  // Resolve os params (Obrigatório no Next.js 15+)
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  const url = process.env.DATABASE_URL;

  try {
    const sql = neon(url);
    const rows = await sql`SELECT * FROM perfis WHERE LOWER(username) = LOWER(${username})`;
    
    if (rows.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
          <p className="opacity-50 font-mono">Usuário "{username}" não encontrado :(</p>
        </div>
      );
    }

    const user = rows[0];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-sans">
        {/* Card Estiloso */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-sm w-full text-center">
          <div className="mb-6">
             <h1 className="text-3xl font-extrabold tracking-tight">{user.nome}</h1>
             <p className="text-gray-400 mt-2 text-sm">{user.bio}</p>
          </div>
          
          <div className="space-y-3">
            {user.links && user.links.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                className="block w-full py-4 bg-white text-black rounded-2xl font-bold hover:scale-[1.03] transition-transform active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-widest opacity-30">
            Powered by Vynex
          </p>
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className="text-white p-10 font-mono text-xs">
        Erro crítico: {e.message}
      </div>
    );
  }
}