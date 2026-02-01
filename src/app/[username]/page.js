export default function UserProfile({ params }) {
  // O Next.js pega automaticamente o nome que vem depois da barra
  const { username } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-2">@{username}</h1>
        <p className="text-gray-400 mb-6">Desenvolvedor e entusiasta tech</p>
        
        <div className="space-y-4">
          <a href="#" className="block w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
            Meu GitHub
          </a>
          <a href="#" className="block w-full py-3 border border-white/30 rounded-lg hover:bg-white/5 transition">
            Meu Portfólio
          </a>
        </div>
      </div>
    </div>
  );
}