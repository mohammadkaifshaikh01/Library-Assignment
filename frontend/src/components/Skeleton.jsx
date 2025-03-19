const BookCardSkeleton = () => {
   return (
     <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse border p-4">
       {/* Image Skeleton */}
       <div className="w-full h-56 bg-gray-300 rounded-lg mb-4"></div>
 
       {/* Title Skeleton */}
       <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
 
       {/* Author Skeleton */}
       <div className="w-1/2 h-4 bg-gray-300 rounded mb-1"></div>
 
       {/* Genre Skeleton */}
       <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
     </div>
   );
 };
 
 export default BookCardSkeleton;
 