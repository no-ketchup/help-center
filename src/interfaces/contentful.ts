import { Entry, Asset } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Category Fields
export interface CategoryFields {
  id: string;
  name: string; // Short string (Symbol)
  description: string; // Long string (Text)
  slug: string; // Short string (Symbol)
}

export interface CategoryEntrySkeleton {
  contentTypeId: 'category'; // Content type ID
  fields: CategoryFields;
}

export type Category = Entry<CategoryEntrySkeleton>;

// User Guide Fields
export interface UserGuideFields {
  title: string; // Short string (Symbol)
  slug: string; // Short string (Symbol)
  body: Document; // Rich text
  categories: Entry<CategoryEntrySkeleton>[]; // Links to categories
  estimatedReadTime: number; // Integer
  createdDate: string; // ISO date string
  updatedDate: string; // ISO date string
  media: Asset[];
}

export interface UserGuideEntrySkeleton {
  contentTypeId: 'userGuide'; // Content type ID
  fields: UserGuideFields;
}

export type UserGuide = Entry<UserGuideEntrySkeleton>;

// Feedback Fields
export interface FeedbackFields {
  relatedGuide: Entry<UserGuideEntrySkeleton>; // Link to a user guide
  userEmail: string; // Short string (Symbol)
  message: string; // Long string (Text)
  rating: number; // Integer
  submittedAt: string; // ISO date string
}

export interface FeedbackEntrySkeleton {
  contentTypeId: 'feedback'; // Content type ID
  fields: FeedbackFields;
}

export type Feedback = Entry<FeedbackEntrySkeleton>;