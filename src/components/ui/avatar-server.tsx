import Image from "next/image";

type propType = {
  image_url: string;
  name: string;
  email: string;
};

const Avatar = ({ image_url, name, email }: propType) => {
  return (
    <>
      <Image
        id="avatarButton"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="rounded-full cursor-pointer"
        width={5}
        height={5}
        src={image_url}
        alt="User dropdown"
      />

      <div
        id="userDropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
      >
        <div className="px-4 py-3 text-sm text-gray-900 text-white">
          <div>{name}</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  );
};

export default Avatar;
