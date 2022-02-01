/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'
import { getCsrfToken } from 'next-auth/react'
import Link from 'next/link'

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context:any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default function Login({ csrfToken } : any) {

  const { register, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Log in with your user</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col items-center">
          <div className="lg:w-1/2 md:w-1/2 my-10 m-auto">
            <h1 className="text-center title-font font-medium text-3xl text-gray-900">Do Your Login Here</h1>
            <p className="text-center mt-4">Do not Forget Your password</p>
          </div>
          <form method="post" action="/api/auth/callback/credentials" className="lg:w-1/3 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
            <div className="relative mb-4">
              <label htmlFor="username" className="leading-7 text-sm text-gray-600">Full Name</label>
              <input required id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input required type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
            <p className="text-xs text-gray-500 mt-3"></p>
            <Link href='/register'>
              <button className="text-white bg-indigo-400 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">Register</button>
            </Link>
            <p className="text-xs text-gray-500 mt-3"></p>
          </form>
        </div>
      </section>
    </div>
  )
}