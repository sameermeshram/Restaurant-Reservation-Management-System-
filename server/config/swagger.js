const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Restaurant Reservation Management API',
    version: '1.0.0',
    description:
      'Production-ready backend API documentation for authentication, table management, reservations, and admin operations.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local development server',
    },
  ],
  tags: [
    { name: 'Health', description: 'Service health and uptime endpoints' },
    { name: 'Authentication', description: 'Authentication and identity endpoints' },
    { name: 'Tables', description: 'Admin table management endpoints' },
    { name: 'Reservations', description: 'Customer and standard reservation endpoints' },
    { name: 'Admin Reservations', description: 'Admin reservation management endpoints' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      UserPublic: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '6865bc0d6b7c22f0bf73f95a' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          role: { type: 'string', enum: ['customer', 'admin'], example: 'customer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Table: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6865be0f3f9d2dc8937fa001' },
          tableNumber: { type: 'string', example: 'T-12' },
          capacity: { type: 'integer', minimum: 1, example: 4 },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Reservation: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '6865c035f5e5cf420ac1b51d' },
          customer: { $ref: '#/components/schemas/UserPublic' },
          table: { $ref: '#/components/schemas/Table' },
          reservationDate: { type: 'string', format: 'date', example: '2026-07-10' },
          timeSlot: { type: 'string', example: '19:30-20:30' },
          guests: { type: 'integer', minimum: 1, example: 3 },
          status: { type: 'string', enum: ['confirmed', 'cancelled'], example: 'confirmed' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 50, example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', minLength: 8, example: 'StrongPass123!' },
          role: { type: 'string', enum: ['customer', 'admin'], example: 'customer' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', example: 'StrongPass123!' },
        },
      },
      AuthSuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Login successful' },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserPublic' },
              accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
              tokenType: { type: 'string', example: 'Bearer' },
            },
          },
        },
      },
      CreateTableRequest: {
        type: 'object',
        required: ['tableNumber', 'capacity'],
        properties: {
          tableNumber: { type: 'string', example: 'T-12' },
          capacity: { type: 'integer', minimum: 1, example: 4 },
          isActive: { type: 'boolean', example: true },
        },
      },
      UpdateTableRequest: {
        type: 'object',
        properties: {
          tableNumber: { type: 'string', example: 'T-13' },
          capacity: { type: 'integer', minimum: 1, example: 6 },
          isActive: { type: 'boolean', example: false },
        },
      },
      CreateReservationRequest: {
        type: 'object',
        required: ['reservationDate', 'timeSlot', 'guests'],
        properties: {
          reservationDate: { type: 'string', format: 'date', example: '2026-07-10' },
          timeSlot: { type: 'string', example: '19:30-20:30' },
          guests: { type: 'integer', minimum: 1, example: 3 },
          status: { type: 'string', enum: ['confirmed', 'cancelled'], example: 'confirmed' },
        },
      },
      UpdateReservationRequest: {
        type: 'object',
        properties: {
          table: { type: 'string', example: '6865be0f3f9d2dc8937fa001' },
          reservationDate: { type: 'string', format: 'date', example: '2026-07-12' },
          timeSlot: { type: 'string', example: '20:00-21:00' },
          guests: { type: 'integer', minimum: 1, example: 4 },
          status: { type: 'string', enum: ['confirmed', 'cancelled'], example: 'cancelled' },
        },
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation failed' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Please provide a valid email address.' },
                value: { example: 'not-an-email' },
                location: { type: 'string', example: 'body' },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          status: { type: 'string', example: 'fail' },
          message: { type: 'string', example: 'Forbidden: insufficient permissions' },
        },
      },
      PaginatedReservationsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Reservation' },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 10 },
              total: { type: 'integer', example: 25 },
              totalPages: { type: 'integer', example: 3 },
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: { success: false, status: 'fail', message: 'date must be in YYYY-MM-DD format' },
          },
        },
      },
      ValidationError: {
        description: 'Validation failed',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ValidationErrorResponse' },
          },
        },
      },
      Unauthorized: {
        description: 'Authentication required or invalid token',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: { success: false, status: 'fail', message: 'Authentication required' },
          },
        },
      },
      Forbidden: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              status: 'fail',
              message: 'Forbidden: insufficient permissions',
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: { success: false, status: 'fail', message: 'Reservation not found' },
          },
        },
      },
      Conflict: {
        description: 'Conflict detected',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              status: 'fail',
              message: 'No table available for the selected date, time slot, and guests',
            },
          },
        },
      },
      TooManyRequests: {
        description: 'Rate limit exceeded',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: {
                  type: 'string',
                  example: 'Too many requests from this IP, please try again later.',
                },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'API health status',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'API is healthy',
                  timestamp: '2026-07-03T12:00:00.000Z',
                  environment: 'development',
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccessResponse' },
                example: {
                  success: true,
                  message: 'User registered successfully',
                  data: {
                    user: {
                      id: '6865bc0d6b7c22f0bf73f95a',
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'customer',
                      createdAt: '2026-07-03T12:00:00.000Z',
                      updatedAt: '2026-07-03T12:00:00.000Z',
                    },
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    tokenType: 'Bearer',
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccessResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Authentication'],
        summary: 'Get current user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Current user returned',
            content: {
              'application/json': {
                example: {
                  success: true,
                  data: {
                    user: {
                      id: '6865bc0d6b7c22f0bf73f95a',
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'customer',
                      createdAt: '2026-07-03T12:00:00.000Z',
                      updatedAt: '2026-07-03T12:00:00.000Z',
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/auth/admin': {
      get: {
        tags: ['Authentication'],
        summary: 'Get admin-only resource',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Admin resource response',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Admin resource accessed successfully',
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/tables': {
      post: {
        tags: ['Tables'],
        summary: 'Create table (admin only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateTableRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Table created',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Table created successfully',
                  data: {
                    _id: '6865be0f3f9d2dc8937fa001',
                    tableNumber: 'T-12',
                    capacity: 4,
                    isActive: true,
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      get: {
        tags: ['Tables'],
        summary: 'Get all tables (admin only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'List of tables',
            content: {
              'application/json': {
                example: {
                  success: true,
                  results: 1,
                  data: [
                    {
                      _id: '6865be0f3f9d2dc8937fa001',
                      tableNumber: 'T-12',
                      capacity: 4,
                      isActive: true,
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/tables/{id}': {
      put: {
        tags: ['Tables'],
        summary: 'Update table (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateTableRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Table updated',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Table updated successfully',
                  data: {
                    _id: '6865be0f3f9d2dc8937fa001',
                    tableNumber: 'T-13',
                    capacity: 6,
                    isActive: true,
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      delete: {
        tags: ['Tables'],
        summary: 'Delete table (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Table deleted',
            content: {
              'application/json': {
                example: { success: true, message: 'Table deleted successfully' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/reservations': {
      post: {
        tags: ['Reservations'],
        summary: 'Create reservation with automatic table assignment (customer only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateReservationRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Reservation created',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Reservation created successfully',
                  data: {
                    _id: '6865c035f5e5cf420ac1b51d',
                    customer: {
                      id: '6865bc0d6b7c22f0bf73f95a',
                      name: 'John Doe',
                      email: 'john@example.com',
                      role: 'customer',
                    },
                    table: {
                      _id: '6865be0f3f9d2dc8937fa001',
                      tableNumber: 'T-12',
                      capacity: 4,
                      isActive: true,
                    },
                    reservationDate: '2026-07-10',
                    timeSlot: '19:30-20:30',
                    guests: 3,
                    status: 'confirmed',
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      get: {
        tags: ['Reservations'],
        summary: 'Get all reservations (admin only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Reservations list',
            content: {
              'application/json': {
                example: {
                  success: true,
                  results: 1,
                  data: [
                    {
                      _id: '6865c035f5e5cf420ac1b51d',
                      reservationDate: '2026-07-10',
                      timeSlot: '19:30-20:30',
                      guests: 3,
                      status: 'confirmed',
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/reservations/my': {
      get: {
        tags: ['Reservations'],
        summary: 'Get current customer reservations',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Current user reservations',
            content: {
              'application/json': {
                example: {
                  success: true,
                  results: 1,
                  data: [
                    {
                      _id: '6865c035f5e5cf420ac1b51d',
                      reservationDate: '2026-07-10',
                      timeSlot: '19:30-20:30',
                      guests: 3,
                      status: 'confirmed',
                    },
                  ],
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/reservations/{id}': {
      get: {
        tags: ['Reservations'],
        summary: 'Get reservation by id',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Reservation details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Reservation' },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Reservations'],
        summary: 'Update reservation by id',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateReservationRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Reservation updated',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Reservation updated successfully',
                  data: {
                    _id: '6865c035f5e5cf420ac1b51d',
                    status: 'cancelled',
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      delete: {
        tags: ['Reservations'],
        summary: 'Delete reservation by id (customer owner only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Reservation deleted',
            content: {
              'application/json': {
                example: { success: true, message: 'Reservation deleted successfully' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/admin/reservations': {
      get: {
        tags: ['Admin Reservations'],
        summary: 'Get reservations with pagination and optional date filter (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'date',
            in: 'query',
            required: false,
            description: 'Date filter in YYYY-MM-DD format',
            schema: { type: 'string', example: '2026-07-10' },
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
          },
        ],
        responses: {
          200: {
            description: 'Paginated reservation list',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedReservationsResponse' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
        },
      },
    },
    '/admin/reservations/{id}': {
      put: {
        tags: ['Admin Reservations'],
        summary: 'Update reservation by id (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateReservationRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Reservation updated',
            content: {
              'application/json': {
                example: {
                  success: true,
                  message: 'Reservation updated successfully',
                  data: {
                    _id: '6865c035f5e5cf420ac1b51d',
                    status: 'confirmed',
                  },
                },
              },
            },
          },
          400: { $ref: '#/components/responses/ValidationError' },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
      delete: {
        tags: ['Admin Reservations'],
        summary: 'Delete reservation by id (admin only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Reservation deleted',
            content: {
              'application/json': {
                example: { success: true, message: 'Reservation deleted successfully' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          403: { $ref: '#/components/responses/Forbidden' },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
};

export default swaggerSpec;
