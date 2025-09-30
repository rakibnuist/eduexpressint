import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  flag?: string;
  images?: string[];
  capital: string;
  currency: string;
  language: string[];
  population?: number;
  area?: number;
  timezone: string;
  climate: {
    type: string;
    description: string;
    averageTemp: {
      summer: number;
      winter: number;
    };
  };
  visa: {
    required: boolean;
    types: Array<{
      name: string;
      duration: string;
      requirements: string[];
      cost: number;
      currency: string;
    }>;
    processingTime: string;
    successRate: number;
  };
  education: {
    system: string;
    levels: string[];
    academicYear: string;
    grading: string;
    recognition: string[];
  };
  costOfLiving: {
    accommodation: {
      min: number;
      max: number;
      currency: string;
    };
    food: {
      min: number;
      max: number;
      currency: string;
    };
    transportation: {
      min: number;
      max: number;
      currency: string;
    };
    utilities: {
      min: number;
      max: number;
      currency: string;
    };
    total: {
      min: number;
      max: number;
      currency: string;
    };
  };
  universities: {
    total: number;
    public: number;
    private: number;
    featured: string[];
  };
  scholarships: {
    government: Array<{
      name: string;
      amount: number;
      currency: string;
      description: string;
    }>;
    university: Array<{
      name: string;
      amount: number;
      currency: string;
      description: string;
    }>;
  };
  workPermit: {
    allowed: boolean;
    conditions: string[];
    hours: number;
    types: string[];
  };
  postGraduation: {
    workVisa: boolean;
    duration: string;
    requirements: string[];
    opportunities: string[];
  };
  culture: {
    overview: string;
    traditions: string[];
    festivals: string[];
    cuisine: string[];
  };
  safety: {
    rating: number;
    description: string;
    tips: string[];
    emergency: {
      police: string;
      medical: string;
      fire: string;
    };
  };
  transportation: {
    international: string[];
    local: string[];
    cost: {
      min: number;
      max: number;
      currency: string;
    };
  };
  accommodation: {
    types: string[];
    averageCost: {
      min: number;
      max: number;
      currency: string;
    };
    tips: string[];
  };
  banking: {
    opening: string[];
    requirements: string[];
    popular: string[];
  };
  healthcare: {
    system: string;
    coverage: string;
    requirements: string[];
    cost: {
      min: number;
      max: number;
      currency: string;
    };
  };
  communication: {
    internet: string;
    mobile: string;
    postal: string;
  };
  attractions: string[];
  tips: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  isActive: boolean;
  isFeatured: boolean;
  priority: number;
  tags: string[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 500
  },
  flag: {
    type: String
  },
  images: [{
    type: String
  }],
  capital: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  language: [{
    type: String,
    required: true
  }],
  population: {
    type: Number
  },
  area: {
    type: Number
  },
  timezone: {
    type: String,
    required: true
  },
  climate: {
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    averageTemp: {
      summer: Number,
      winter: Number
    }
  },
  visa: {
    required: {
      type: Boolean,
      required: true
    },
    types: [{
      name: String,
      duration: String,
      requirements: [String],
      cost: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }],
    processingTime: String,
    successRate: Number
  },
  education: {
    system: String,
    levels: [String],
    academicYear: String,
    grading: String,
    recognition: [String]
  },
  costOfLiving: {
    accommodation: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    food: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    transportation: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    utilities: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    total: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  universities: {
    total: Number,
    public: Number,
    private: Number,
    featured: [String]
  },
  scholarships: {
    government: [{
      name: String,
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      description: String
    }],
    university: [{
      name: String,
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      description: String
    }]
  },
  workPermit: {
    allowed: Boolean,
    conditions: [String],
    hours: Number,
    types: [String]
  },
  postGraduation: {
    workVisa: Boolean,
    duration: String,
    requirements: [String],
    opportunities: [String]
  },
  culture: {
    overview: String,
    traditions: [String],
    festivals: [String],
    cuisine: [String]
  },
  safety: {
    rating: Number,
    description: String,
    tips: [String],
    emergency: {
      police: String,
      medical: String,
      fire: String
    }
  },
  transportation: {
    international: [String],
    local: [String],
    cost: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  accommodation: {
    types: [String],
    averageCost: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    tips: [String]
  },
  banking: {
    opening: [String],
    requirements: [String],
    popular: [String]
  },
  healthcare: {
    system: String,
    coverage: String,
    requirements: [String],
    cost: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  communication: {
    internet: String,
    mobile: String,
    postal: String
  },
  attractions: [String],
  tips: [String],
  faqs: [{
    question: String,
    answer: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  },
  tags: [String],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Indexes for better performance
DestinationSchema.index({ slug: 1 });
DestinationSchema.index({ isActive: 1, isFeatured: 1 });
DestinationSchema.index({ tags: 1 });

// Text search index
DestinationSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  capital: 'text',
  tags: 'text'
});

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
