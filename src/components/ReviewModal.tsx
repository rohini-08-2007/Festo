import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventType } from '../types';
import { EVENT_TYPES } from '../data/mockData';
import { X, Star } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { reviewModalTargetProvider, closeReviewModal, addReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('Rachel Green');
  const [authorLocation, setAuthorLocation] = useState<string>('Austin, TX');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!reviewModalTargetProvider) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || comment.trim().length < 10) {
      setError('Please provide at least 10 characters describing your experience.');
      return;
    }

    addReview(reviewModalTargetProvider.id, {
      authorName: authorName.trim() || 'Anonymous Client',
      authorLocation: authorLocation.trim() || 'Austin, TX',
      rating,
      eventType,
      comment: comment.trim()
    });

    closeReviewModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7DCce] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 bg-[#F3ECE2] border-b border-[#DFCFC0]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#4A0E2E]">
              Write a Verified Review
            </h3>
            <p className="text-xs text-[#6B5A58]">
              {reviewModalTargetProvider.name}
            </p>
          </div>
          <button
            onClick={closeReviewModal}
            className="p-2 text-[#7C6866] hover:text-[#4A0E2E] rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Star Selector */}
          <div className="text-center py-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#7C6866] mb-2">
              Select Your Overall Rating
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[#4A0E2E] mt-1 block">
              {rating === 5 && 'Outstanding Experience (5 / 5)'}
              {rating === 4 && 'Great Service (4 / 5)'}
              {rating === 3 && 'Average Experience (3 / 5)'}
              {rating === 2 && 'Needs Improvement (2 / 5)'}
              {rating === 1 && 'Unsatisfactory (1 / 5)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={authorLocation}
                onChange={e => setAuthorLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
              Celebration / Event Type
            </label>
            <select
              value={eventType}
              onChange={e => setEventType(e.target.value as EventType)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
            >
              {EVENT_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">
              Your Review & Feedback *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={e => {
                setComment(e.target.value);
                if (error) setError('');
              }}
              placeholder="What impressed you about their services? Punctuality, artistry, guest reactions, value for price..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#DFCFC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8F2556]"
            />
            {error && <p className="text-[11px] text-rose-600 mt-1">{error}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7DCce]">
            <button
              type="button"
              onClick={closeReviewModal}
              className="px-4 py-2 text-xs font-semibold text-[#5C4A48] hover:bg-[#EFE3D6] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#4A0E2E] hover:bg-[#380922] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Post Review
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
