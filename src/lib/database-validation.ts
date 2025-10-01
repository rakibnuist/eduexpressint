// Database validation utilities for ensuring data integrity
import { dbConnect } from './db';

export interface DatabaseOperationResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export class DatabaseValidator {
  /**
   * Validates database connection before operations
   */
  static async validateConnection(): Promise<DatabaseOperationResult> {
    try {
      const connection = await dbConnect();
      
      if (!connection) {
        return {
          success: false,
          error: 'Database connection failed',
          message: 'Unable to connect to the database. Please check your connection settings.'
        };
      }

      return {
        success: true,
        message: 'Database connection validated successfully'
      };
    } catch (error) {
      console.error('Database connection validation error:', error);
      return {
        success: false,
        error: 'Database connection validation failed',
        message: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }

  /**
   * Validates required fields for updates
   */
  static validateUpdateData(data: any): DatabaseOperationResult {
    const requiredFields = ['title', 'content', 'type', 'priority', 'status'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: 'Missing required fields',
        message: `The following fields are required: ${missingFields.join(', ')}`
      };
    }

    // Validate enum values
    const validTypes = ['announcement', 'news', 'maintenance', 'feature', 'general'];
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    const validStatuses = ['draft', 'published', 'archived'];

    if (!validTypes.includes(data.type)) {
      return {
        success: false,
        error: 'Invalid type',
        message: `Type must be one of: ${validTypes.join(', ')}`
      };
    }

    if (!validPriorities.includes(data.priority)) {
      return {
        success: false,
        error: 'Invalid priority',
        message: `Priority must be one of: ${validPriorities.join(', ')}`
      };
    }

    if (!validStatuses.includes(data.status)) {
      return {
        success: false,
        error: 'Invalid status',
        message: `Status must be one of: ${validStatuses.join(', ')}`
      };
    }

    return {
      success: true,
      message: 'Update data validation passed'
    };
  }

  /**
   * Validates required fields for success stories
   */
  static validateSuccessStoryData(data: any): DatabaseOperationResult {
    const requiredFields = [
      'studentName', 
      'studentNationality', 
      'university', 
      'universityCountry', 
      'program', 
      'programLevel', 
      'title', 
      'story', 
      'shortDescription',
      'graduationYear'
    ];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: 'Missing required fields',
        message: `The following fields are required: ${missingFields.join(', ')}`
      };
    }

    // Validate enum values
    const validProgramLevels = ['Bachelor', 'Masters', 'PhD', 'Diploma', 'Foundation', 'Certificate'];

    if (!validProgramLevels.includes(data.programLevel)) {
      return {
        success: false,
        error: 'Invalid program level',
        message: `Program level must be one of: ${validProgramLevels.join(', ')}`
      };
    }

    // Validate graduation year
    const currentYear = new Date().getFullYear();
    if (data.graduationYear < 2000 || data.graduationYear > currentYear + 10) {
      return {
        success: false,
        error: 'Invalid graduation year',
        message: `Graduation year must be between 2000 and ${currentYear + 10}`
      };
    }

    return {
      success: true,
      message: 'Success story data validation passed'
    };
  }

  /**
   * Logs database operations for monitoring
   */
  static logOperation(operation: string, collection: string, data?: any, error?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      operation,
      collection,
      success: !error,
      data: data ? (typeof data === 'object' ? JSON.stringify(data) : data) : null,
      error: error ? (error instanceof Error ? error.message : error) : null
    };

    if (error) {
      console.error(`[DB_OPERATION_ERROR] ${JSON.stringify(logEntry)}`);
    } else {
      console.log(`[DB_OPERATION_SUCCESS] ${JSON.stringify(logEntry)}`);
    }
  }
}

/**
 * Wrapper function for database operations with validation and logging
 */
export async function withDatabaseValidation<T>(
  operation: () => Promise<T>,
  operationName: string,
  collectionName: string,
  data?: any
): Promise<DatabaseOperationResult> {
  try {
    // Validate database connection
    const connectionValidation = await DatabaseValidator.validateConnection();
    if (!connectionValidation.success) {
      DatabaseValidator.logOperation(operationName, collectionName, data, connectionValidation.error);
      return connectionValidation;
    }

    // Execute the operation
    const result = await operation();
    
    // Log successful operation
    DatabaseValidator.logOperation(operationName, collectionName, data);
    
    return {
      success: true,
      data: result,
      message: `${operationName} completed successfully`
    };
  } catch (error) {
    // Log failed operation
    DatabaseValidator.logOperation(operationName, collectionName, data, error);
    
    return {
      success: false,
      error: 'Database operation failed',
      message: error instanceof Error ? error.message : 'Unknown database error'
    };
  }
}
