import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Menu from '@/components/Menu'

import type { Meta, WithChildren } from '@/types'

interface LayoutProps extends WithChildren {
  meta?: Meta
  siteId?: string
  subdomain?: string
}

export default function Layout({ meta, children, subdomain }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{meta?.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href={meta?.logo} />
        <link rel="apple-touch-icon" sizes="180x180" href={meta?.logo} />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta itemProp="name" content={meta?.title} />
        <meta itemProp="description" content={meta?.description} />
        <meta itemProp="image" content={meta?.ogImage} />
        <meta name="description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:url" content={meta?.ogUrl} />
        <meta property="og:image" content={meta?.ogImage} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Vercel" />
        <meta name="twitter:creator" content="@StevenTey" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta name="twitter:image" content={meta?.ogImage} />
        {subdomain != 'demo' && <meta name="robots" content="noindex" />}
      </Head>
      <div>
        <div className="flex justify-center items-center space-x-5 h-full max-w-screen-xl mx-auto px-10 sm:px-20">
          <Menu pages={meta?.pages}></Menu>
        </div>
      </div>

      <div className="mt-20">{children}</div>

      {subdomain == 'demo' && (
        <div>
          <button>
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="text-center lg:text-left">
            <p className="font-cal text-lg sm:text-2xl text-black">
              Platforms Starter Kit Demo
            </p>
            <p>
              This is a demo site showcasing how to build a multi-tenant
              application with{' '}
              <a
                className="text-black font-semibold underline"
                href="https://platformize.co"
                rel="noreferrer"
                target="_blank"
              >
                custom domain
              </a>{' '}
              support.
            </p>
          </div>
          <div>
            <a
              className="flex-auto font-cal text-lg rounded-md py-1 sm:py-3 px-5 text-black border border-gray-200 hover:border-black transition-all ease-in-out duration-150 whitespace-no-wrap"
              href="https://app.vercel.pub"
              rel="noreferrer"
              target="_blank"
            >
              Create your publication
            </a>
            <a
              className="flex-auto font-cal text-lg bg-black text-white border border-black rounded-md py-1 sm:py-3 px-5 hover:text-black hover:bg-white transition-all ease-in-out duration-150 whitespace-no-wrap"
              href="https://vercel.com/guides/nextjs-multi-tenant-application"
              rel="noreferrer"
              target="_blank"
            >
              Clone and deploy
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
