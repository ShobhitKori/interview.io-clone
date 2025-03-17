"use client"
import { Star } from "lucide-react"

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none"
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            size={20}
            className={`${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } transition-colors duration-150`}
          />
        </button>
      ))}
    </div>
  )
}

export default StarRating

