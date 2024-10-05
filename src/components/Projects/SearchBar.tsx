import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder, onSearch }: { placeholder: string, onSearch: (term: string) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounced function to update the search term in the URL and call the parent search handler
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to first page when searching

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    // Update the URL without reloading the page
    replace(`${pathname}?${params.toString()}`);

    // Call the onSearch prop passed from the parent to filter the projects
    onSearch(term);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Tìm kiếm
      </label>
      <input
        id="search"
        type="text"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search') || ''} // Use default value from URL if present
      />
      <MagnifyingGlassIcon 
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary 
        peer-focus:text-gray-900 dark:peer-focus:text-white"
      />
    </div>
  );
}
