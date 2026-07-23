function Register() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <form className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
          <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>
  
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded border px-3 py-2"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded border px-3 py-2"
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded border px-3 py-2"
            />
          </div>
  
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
  
  export default Register;