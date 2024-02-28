import Skeleton from "../../Skeleton/Skeleton";

const LoadingSkeleton = () => (
  <>
    <li className="flex flex-col gap-7 p-4 m-10">
      <div>
        <div>
          <h2 className="mb-1">
            <Skeleton className="w-[128px] max-w-full" />
          </h2>
          <p>
              <Skeleton className="w-[208px] max-w-full" />
          </p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <h3>
          <Skeleton className="w-[40px] max-w-full" />
        </h3>
        <span>
          <Skeleton className="w-[40px] max-w-full" />
        </span>
      </div>
    </li>
  </>
);
export default LoadingSkeleton;
