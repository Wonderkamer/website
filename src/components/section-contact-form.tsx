'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { contactSchema, type ContactFormValues } from '@/lib/contact-schema';
import { useRecaptcha } from '@/lib/use-recaptcha';

type FormFields = Omit<ContactFormValues, 'recaptchaToken'>;

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <span className="block w-full pt-1 text-right text-xs text-orange-600">{message}</span>;
}

const inputClasses = 'w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-[#ffe607] focus:outline-none focus:ring-2 focus:ring-[#ffe607]';

export function SectionContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isErrorneous, setIsErrorneous] = useState(false);
  const { isReady: isRecaptchaReady, execute } = useRecaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(contactSchema.omit({ recaptchaToken: true })),
  });

  const onSubmit = async (data: FormFields) => {
    setIsErrorneous(false);

    try {
      const recaptchaToken = await execute('contact');

      const response = await fetch('/api/support/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (!response.ok) {
        setIsErrorneous(true);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting the form', error);
      setIsErrorneous(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-primary/30 p-5">
        <svg className="h-6 w-6 flex-none text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
            clipRule="evenodd"
          />
        </svg>
        <p className="m-0 text-gray-800">Bedankt voor je reactie, we nemen contact met je op...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <label className="mb-4 flex w-full flex-col items-start">
          <span className="pb-1 text-sm font-medium text-gray-700">Naam</span>
          <input className={inputClasses} {...register('name')} />
          <FieldError message={errors.name?.message} />
        </label>

        <label className="mb-4 flex w-full flex-col items-start">
          <span className="pb-1 text-sm font-medium text-gray-700">E-mail</span>
          <input type="email" className={inputClasses} {...register('email')} />
          <FieldError message={errors.email?.message} />
        </label>

        <label className="mb-4 flex w-full flex-col items-start">
          <span className="pb-1 text-sm font-medium text-gray-700">Telefoon</span>
          <input type="tel" className={inputClasses} {...register('phone')} />
          <FieldError message={errors.phone?.message} />
        </label>

        <label className="mb-4 flex w-full flex-col items-start">
          <span className="pb-1 text-sm font-medium text-gray-700">Onderwerp</span>
          <input className={inputClasses} {...register('subject')} />
          <FieldError message={errors.subject?.message} />
        </label>

        <label className="mb-4 flex w-full flex-col items-start">
          <span className="pb-1 text-sm font-medium text-gray-700">Boodschap</span>
          <textarea className={inputClasses} rows={5} {...register('message')} />
          <FieldError message={errors.message?.message} />
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !isRecaptchaReady}
          className="mt-2 w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Verzenden...' : 'Verzend'}
        </button>
      </form>

      {isErrorneous ? <p className="mt-4 text-sm text-orange-600">Er ging iets mis, probeer het nog een keer...</p> : null}
    </>
  );
}
