/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'

const saveNewUser = async (data:any) => {
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export default function Register() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      saveNewUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col items-center">
          <div className="lg:w-1/2 md:w-1/2 my-10 m-auto">
            <h1 className="text-center title-font font-medium text-3xl text-gray-900">Do Your Registration Here</h1>
            <p className="text-center mt-4">All data is necessary</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/3 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input {...register("name", { required: true, maxLength: 30 })} required id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input {...register("password", { required: true, maxLength: 30 })} required type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="image" className="leading-7 text-sm text-gray-600">Avatar</label>
              <input {...register("avatar")} id="avatar" name="avatar" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="text" className="leading-7 text-sm text-gray-600">Interests</label>
              <textarea {...register("interests")} id="interests" name="interests" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="flex justify-center">
              <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
              <p className="text-xs text-gray-500 mt-3"></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}