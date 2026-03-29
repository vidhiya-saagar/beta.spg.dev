import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '@nanostores/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import './styles/Blog.css';
import {
  isOpen,
  originalTuk,
  bhaiVirSinghFootnote,
  customFootnotes,
} from '../store/tukFootnoteStore';

const avatars = {
  'Kamalpreet Singh':
    'https://res.cloudinary.com/dip5mdxwe/image/upload/c_scale,w_64,h_64,q_auto/v1681488757/273458479_733618817604431_6653348205549108853_n_uiglgd.jpg',
  'Vidhiya Saagar':
    'https://res.cloudinary.com/dip5mdxwe/image/upload/c_scale,w_64,h_64,q_auto/v1681487920/logo_copy_gpjbxt.png',
};

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description } = node.data.target.fields;
      const { url, contentType } = node.data.target.fields.file;
      const isPdf = contentType === 'application/pdf';

      return isPdf ? (
        <div>
          <a href={url} download>
            {title}
          </a>
        </div>
      ) : (
        <figure>
          <img src={url} alt={title} loading="lazy" />
          {description && <figcaption>{description}</figcaption>}
        </figure>
      );
    },
  },
};

export default function FootnoteSlideOver(): JSX.Element {
  const $isOpen = useStore(isOpen);
  const $bhaiVirSinghFootnote = useStore(bhaiVirSinghFootnote);
  const $originalTuk = useStore(originalTuk);
  const $customFootnotes = useStore(customFootnotes);

  return (
    <Transition.Root show={$isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => isOpen.set(false)}>
        <div className="fixed inset-0 bg-base-200 bg-opacity-50" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md blog-content">
                  <div className="flex h-full flex-col overflow-y-scroll bg-base-100 py-6 shadow-xl">
                    <div className="px-4 sm:px-6 mb-8">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base-content text-lg leading-6">
                          Footnotes
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md text-neutral bg-base-100 hover:text-neutral-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            onClick={() => isOpen.set(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bhai Vir Singh Footnotes BELOW */}
                    {$bhaiVirSinghFootnote && (
                      <div className="relative flex-1 px-4 sm:px-6">
                        <div className="flex items-center mb-4">
                          <img
                            className="inline-block h-8 w-8 rounded-full mr-2"
                            src="https://res.cloudinary.com/dip5mdxwe/image/upload/c_scale,w_64,h_64,q_auto/v1681489499/Bahi_Veer_Singh_izsrxv.png"
                            alt="Avatar of Dr. Bhai Vir Singh"
                            width="32"
                            height="32"
                          />
                          <h4 className="text-base-content m-0">Dr. Bhai Vir Singh:</h4>
                        </div>
                        <blockquote className="relative">
                          <p className="text-base-content sm:text-xl dark:text-base-100">
                            {$originalTuk}
                          </p>
                        </blockquote>
                        <div
                          className="mt-6 footnote text-base-content"
                          dangerouslySetInnerHTML={{
                            __html: $bhaiVirSinghFootnote,
                          }}
                        ></div>
                      </div>
                    )}
                    {/* Bhai Vir Singh Footnotes ABOVE */}

                    {/* ------------------------------- */}

                    {/* Custom Footnotes BELOW */}
                    {$customFootnotes && (
                      <div className="relative flex-1 px-4 sm:px-6">
                        {Object.entries($customFootnotes).map(([key, value]) => {
                          const avatar = avatars[key];
                          if (avatar && value !== null) {
                            return (
                              <div key={key}>
                                <div className="flex items-center mb-4">
                                  <img
                                    className="inline-block h-8 w-8 rounded-full mr-2"
                                    src={avatar}
                                    alt={`Avatar of ${key}`}
                                    width="32"
                                    height="32"
                                  />
                                  <h4 style={{ marginBottom: 0 }}>{key}:</h4>
                                </div>

                                {/* Create HTML Dom Elements from Contenful CMS Rich Text */}
                                {documentToReactComponents(value.content, contentfulOptions)}

                                {/* Create <img /> */}
                                {value.media && (
                                  <figure>
                                    <img
                                      src={value.media.fields.file.url}
                                      alt={value.media.fields.title}
                                      loading="lazy"
                                    />
                                    {value.media.fields.description && (
                                      <figcaption>{value.media.fields.description}</figcaption>
                                    )}
                                  </figure>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                    {/* Custom Footnotes ABOVE */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
