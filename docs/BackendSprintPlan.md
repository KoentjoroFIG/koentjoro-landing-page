# Koentjoro Backend Development Sprint Plan

**Tech Stack:** FastAPI + Python, Strawberry GraphQL, Beanie ODM, MongoDB (Motor), JWT Auth, Docker

**Total Estimated Duration:** 10-12 weeks (6 sprints @ 2 weeks each)

---

## Sprint 0: Foundation & Infrastructure Setup (2 weeks)

**Goal:** Set up development environment, database, core configuration, and baseline infrastructure.

### Ticket 0.1: Database & ODM Setup

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `database/`

**Subtasks:**

1. Configure MongoDB connection using Motor (async driver) — 2h
   - Update `database/db.py` with async MongoDB client initialization
   - Add connection pooling and retry logic
   - Create database name configuration in `core/config.py`
2. Set up Beanie ODM initialization — 2h
   - Create `init_beanie()` function
   - Register document models
   - Add to FastAPI lifespan events
3. Create database migration strategy — 2h
   - Document manual migration approach (Beanie doesn't have auto-migrations)
   - Create `database/migration/` scripts structure
   - Add migration runner utility
4. Add database health check endpoint — 1h
   - Extend `/health` to include DB ping
5. Write database connection tests — 1h
   - Test connection success/failure scenarios

**Acceptance Criteria:**

- [ ] MongoDB connects successfully on app startup
- [ ] Beanie initializes with all document models
- [ ] Database health check returns connection status
- [ ] Connection handles failures gracefully with retries
- [ ] Environment variables for DB connection documented in `.env.example`

**Dependencies:** None

---

### Ticket 0.2: Enhanced Configuration & Environment Management

**Priority:** P0 (Blocker)  
**Estimate:** 4 hours  
**Assigned Module:** `core/`

**Subtasks:**

1. Expand `core/config.py` settings — 2h
   - Add JWT settings (secret, algorithm, expiration)
   - Add email service configuration (SMTP or API keys)
   - Add MongoDB connection string and database name
   - Add CORS origins configuration
   - Add file upload settings (max size, allowed types)
2. Create `.env.example` template — 1h
   - Document all required environment variables
   - Add comments explaining each variable
3. Add configuration validation — 1h
   - Ensure required vars are present on startup
   - Add helpful error messages for missing config

**Acceptance Criteria:**

- [ ] All configuration centralized in `Settings` class
- [ ] `.env.example` documents all required variables
- [ ] App fails fast with clear message if config is missing
- [ ] Sensitive values (secrets) use `SecretStr` type

**Dependencies:** None

---

### Ticket 0.3: Security Core Setup

**Priority:** P0 (Blocker)  
**Estimate:** 6 hours  
**Assigned Module:** `core/security.py`

**Subtasks:**

1. Implement password hashing utilities — 2h
   - Use passlib with bcrypt
   - Create `hash_password()` and `verify_password()` functions
2. Implement JWT token utilities — 3h
   - Create `create_access_token()` function
   - Create `create_refresh_token()` function
   - Create `decode_token()` with expiration validation
   - Add token payload typing
3. Create security dependencies — 1h
   - `get_current_user()` dependency for protected routes
   - `get_current_active_user()` with status check
   - Token extraction from Authorization header

**Acceptance Criteria:**

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens created with configurable expiration
- [ ] Token validation includes expiration and signature checks
- [ ] Dependencies ready for use in protected routes
- [ ] Unit tests for all security functions

**Dependencies:** 0.2 (config for JWT settings)

---

### Ticket 0.4: CORS & Middleware Configuration

**Priority:** P1 (High)  
**Estimate:** 3 hours  
**Assigned Module:** `main.py`

**Subtasks:**

1. Add CORS middleware — 1h
   - Configure allowed origins from settings
   - Set allowed methods and headers
   - Enable credentials support
2. Add request logging middleware — 1h
   - Log request method, path, and response time
   - Add request ID for tracing
3. Add error handling middleware — 1h
   - Catch unhandled exceptions
   - Return consistent error response format
   - Log errors with stack traces

**Acceptance Criteria:**

- [ ] Frontend can make CORS requests successfully
- [ ] All requests logged with timing information
- [ ] Unhandled errors return 500 with consistent format
- [ ] Error details hidden in production mode

**Dependencies:** 0.2 (config for CORS origins)

---

### Ticket 0.5: Docker & Local Development Setup

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `docker/`, root `docker-compose.yml`

**Subtasks:**

1. Enhance Dockerfile — 2h
   - Multi-stage build (builder + runtime)
   - Optimize layer caching
   - Add healthcheck
   - Use non-root user
2. Update docker-compose.yml — 3h
   - Add MongoDB service
   - Add backend service with proper networking
   - Add volumes for MongoDB persistence
   - Add environment variable injection
   - Add depends_on with healthchecks
3. Create `backend-python/README.md` — 1h
   - Local setup instructions (venv, pip install)
   - Docker setup instructions
   - Run commands (uvicorn, docker-compose)
   - Health check examples

**Acceptance Criteria:**

- [ ] `docker-compose up` starts backend + MongoDB
- [ ] Backend connects to MongoDB container successfully
- [ ] Hot reload works in development mode
- [ ] README has clear setup and run instructions
- [ ] Dockerfile follows best practices (security, size)

**Dependencies:** 0.1 (database configuration), 0.2 (env config)

---

### Ticket 0.6: Logging & Monitoring Setup

**Priority:** P2 (Medium)  
**Estimate:** 4 hours  
**Assigned Module:** `core/`, `main.py`

**Subtasks:**

1. Configure structured logging — 2h
   - Use Python's logging with JSON formatter
   - Add log levels per environment (DEBUG in dev, INFO in prod)
   - Add context to log messages (request_id, user_id)
2. Add application metrics — 2h
   - Track request count and duration
   - Track error rates
   - Add metrics endpoint for monitoring tools

**Acceptance Criteria:**

- [ ] Logs output in JSON format for production
- [ ] Log levels configurable via environment
- [ ] Metrics available at `/metrics` endpoint
- [ ] Request context propagated through logs

**Dependencies:** 0.2 (config for log level)

---

## Sprint 1: Authentication & User Management (2 weeks)

**Goal:** Implement complete authentication system for both owner and company users.

### Ticket 1.1: User Domain Models

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `auth/domain/model.py`

**Subtasks:**

1. Create `User` Beanie document model — 3h
   - Fields: email, hashed_password, role (owner/company), full_name, is_active, is_verified, created_at, updated_at
   - Email uniqueness index
   - Role enum (OWNER, COMPANY_REP, ADMIN)
2. Create `CompanyProfile` Beanie document model — 3h
   - Fields: user_id (reference), company_name, industry, size, website, description, logo_url, verified
   - Relationship to User
3. Create `OwnerProfile` Beanie document model — 1h
   - Fields: user_id (reference), bio, cv_url, profile_image_url
4. Add model validation and methods — 1h
   - Email format validation
   - Password strength validation
   - Convenience methods (full profile data)

**Acceptance Criteria:**

- [ ] Models follow Beanie ODM patterns
- [ ] Indexes created for performance (email, user_id)
- [ ] Validation rules prevent invalid data
- [ ] Models registered with Beanie initialization
- [ ] Type hints complete for all fields

**Dependencies:** 0.1 (database setup)

---

### Ticket 1.2: User Repository Layer

**Priority:** P0 (Blocker)  
**Estimate:** 6 hours  
**Assigned Module:** `auth/domain/repository.py`

**Subtasks:**

1. Create `UserRepository` class — 3h
   - `create_user()` — insert with validation
   - `get_user_by_id()` — retrieve by ID
   - `get_user_by_email()` — retrieve by email
   - `update_user()` — update fields
   - `delete_user()` — soft or hard delete
2. Create `CompanyProfileRepository` class — 2h
   - CRUD operations for company profiles
   - `get_by_user_id()`
3. Create `OwnerProfileRepository` class — 1h
   - CRUD operations for owner profile

**Acceptance Criteria:**

- [ ] All repository methods are async
- [ ] Methods handle not-found cases gracefully
- [ ] Repository uses type hints
- [ ] Unit tests for each repository method
- [ ] Follows repository pattern (no business logic)

**Dependencies:** 1.1 (models)

---

### Ticket 1.3: Authentication Service & Business Logic

**Priority:** P0 (Blocker)  
**Estimate:** 10 hours  
**Assigned Module:** `auth/domain/service.py`

**Subtasks:**

1. Implement registration service — 3h
   - `register_owner()` — create owner user + profile
   - `register_company()` — create company user + profile
   - Hash passwords before storing
   - Send verification email (integration with email module)
2. Implement login service — 3h
   - `authenticate_user()` — verify email + password
   - Return access and refresh tokens
   - Update last_login timestamp
3. Implement token refresh service — 2h
   - `refresh_access_token()` — validate refresh token and issue new access token
4. Implement password management — 2h
   - `request_password_reset()` — generate reset token, send email
   - `reset_password()` — validate token and update password
   - `change_password()` — update password for authenticated user

**Acceptance Criteria:**

- [ ] Registration creates user and profile in transaction
- [ ] Passwords never stored in plain text
- [ ] Login returns JWT tokens
- [ ] Token refresh works without re-authentication
- [ ] Password reset flow secure (time-limited tokens)
- [ ] Service methods have comprehensive error handling
- [ ] Unit tests with mocked repositories

**Dependencies:** 1.2 (repository), 0.3 (security utils), Sprint 2 Ticket 2.1 (email service)

---

### Ticket 1.4: REST API Endpoints for Auth

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `auth/router.py`

**Subtasks:**

1. Create Pydantic schemas — 2h
   - `RegisterOwnerRequest`, `RegisterCompanyRequest`
   - `LoginRequest`, `LoginResponse`
   - `RefreshTokenRequest`, `TokenResponse`
   - `PasswordResetRequest`, `PasswordResetConfirm`
   - `UserResponse`, `ProfileResponse`
2. Implement REST endpoints — 5h
   - `POST /auth/register/owner` — owner registration
   - `POST /auth/register/company` — company registration
   - `POST /auth/login` — user login
   - `POST /auth/refresh` — refresh access token
   - `POST /auth/password-reset/request` — request password reset
   - `POST /auth/password-reset/confirm` — confirm password reset
   - `GET /auth/me` — get current user (protected)
   - `PUT /auth/me` — update current user (protected)
3. Add router to FastAPI app — 1h
   - Register router in `main.py`
   - Add `/auth` prefix and tags

**Acceptance Criteria:**

- [ ] All endpoints follow REST conventions
- [ ] Request/response schemas validated with Pydantic
- [ ] Protected endpoints require valid JWT
- [ ] Endpoints return appropriate HTTP status codes
- [ ] API documentation (OpenAPI) auto-generated
- [ ] Integration tests for each endpoint

**Dependencies:** 1.3 (service), 0.3 (security deps)

---

### Ticket 1.5: GraphQL Mutations & Queries for Auth

**Priority:** P1 (High)  
**Estimate:** 8 hours  
**Assigned Module:** `auth/graphql/`, `graphql/mutation.py`, `graphql/query.py`

**Subtasks:**

1. Create Strawberry types — 2h
   - `UserType`, `CompanyProfileType`, `OwnerProfileType`
   - `AuthPayload` (user + tokens)
   - Input types for registration, login
2. Implement auth mutations — 4h
   - `registerOwner(input: RegisterOwnerInput!): AuthPayload!`
   - `registerCompany(input: RegisterCompanyInput!): AuthPayload!`
   - `login(email: String!, password: String!): AuthPayload!`
   - `refreshToken(refreshToken: String!): TokenPayload!`
   - `requestPasswordReset(email: String!): Boolean!`
   - `resetPassword(token: String!, newPassword: String!): Boolean!`
3. Implement auth queries — 2h
   - `me: UserType!` (requires authentication)
   - `userProfile(userId: ID!): ProfileType`
4. Add to global GraphQL schema — 1h (included above)
   - Register in `graphql/mutation.py` and `graphql/query.py`

**Acceptance Criteria:**

- [ ] GraphQL schema introspection shows all types and operations
- [ ] Mutations return appropriate data or errors
- [ ] Authentication context passed to resolvers
- [ ] GraphQL playground accessible at `/graphql`
- [ ] Integration tests for GraphQL operations

**Dependencies:** 1.3 (service), 0.3 (security)

---

### Ticket 1.6: Email Verification Flow

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `auth/`, `email/`

**Subtasks:**

1. Generate verification tokens — 2h
   - Create time-limited verification tokens (JWT or UUID)
   - Store tokens in database or encode in JWT
2. Send verification email on registration — 2h
   - Integrate with email service
   - Create email template with verification link
3. Implement verification endpoint — 2h
   - `GET /auth/verify-email?token=<token>` — verify and activate user
   - Update `is_verified` flag

**Acceptance Criteria:**

- [ ] Verification email sent on registration
- [ ] Verification link works and activates account
- [ ] Expired tokens rejected with clear message
- [ ] Already-verified users can't re-verify
- [ ] Unverified users can request new verification email

**Dependencies:** 1.3 (auth service), email module (Sprint 2 Ticket 2.1)

---

## Sprint 2: Offer/Bid System & Email Notifications (2 weeks)

**Goal:** Implement core "reverse hiring" feature where companies submit offers to the owner.

### Ticket 2.1: Email Service Implementation

**Priority:** P0 (Blocker) — needed for auth verification  
**Estimate:** 8 hours  
**Assigned Module:** `email/`

**Subtasks:**

1. Choose and configure email provider — 2h
   - Options: SendGrid, Mailgun, AWS SES, or SMTP
   - Add API keys/credentials to settings
   - Create email client wrapper in `email/utils.py`
2. Create email templates — 3h
   - HTML templates for: verification, password reset, offer notifications, messages
   - Use templating (Jinja2 or similar)
   - Store templates in `email/templates/`
3. Implement email service — 3h
   - `send_verification_email()`
   - `send_password_reset_email()`
   - `send_offer_notification_email()`
   - `send_message_notification_email()`
   - Add to `email/domain/service.py`
4. Add email queue (optional, recommended) — 2h (if time)
   - Use background task or Celery for async sending
   - Retry logic for failed sends

**Acceptance Criteria:**

- [ ] Emails sent successfully via configured provider
- [ ] Templates render with dynamic data
- [ ] Email sending doesn't block HTTP responses
- [ ] Failed email sends logged and retried
- [ ] Test emails sent in development (log or catch-all)

**Dependencies:** 0.2 (config for email settings)

---

### Ticket 2.2: Offer Domain Models

**Priority:** P0 (Blocker)  
**Estimate:** 6 hours  
**Assigned Module:** `bid/domain/model.py` (create new `bid/` module)

**Subtasks:**

1. Create `Offer` Beanie document model — 4h
   - Fields: company_user_id, position_title, salary_offered, currency, benefits (list), message, status (pending/accepted/rejected/negotiating), created_at, updated_at, viewed_at, response_message
   - Status enum
   - Indexes on company_user_id, status, created_at
2. Create `OfferStatusHistory` model — 2h
   - Fields: offer_id, old_status, new_status, changed_by, changed_at, note
   - Track status changes for audit trail

**Acceptance Criteria:**

- [ ] Offer model captures all required bid information
- [ ] Status transitions tracked in history
- [ ] Indexes optimize common queries (by status, by date)
- [ ] Model validation ensures required fields

**Dependencies:** 0.1 (database), 1.1 (user models for references)

---

### Ticket 2.3: Offer Repository & Service

**Priority:** P0 (Blocker)  
**Estimate:** 10 hours  
**Assigned Module:** `bid/domain/repository.py`, `bid/domain/service.py`

**Subtasks:**

1. Create `OfferRepository` — 3h
   - CRUD operations
   - `get_offers_by_company()`
   - `get_all_offers_for_owner()` with filtering/pagination
   - `get_offer_by_id()`
   - `update_offer_status()`
2. Create `OfferService` — 5h
   - `submit_offer()` — company submits offer, notify owner via email
   - `get_offers_for_owner()` — owner views all offers with filters (status, date)
   - `get_offers_for_company()` — company views their submitted offers
   - `update_offer_status()` — owner accepts/rejects/negotiates, notify company
   - `add_response_message()` — owner adds response to offer
3. Implement notifications — 2h
   - Send email to owner when new offer submitted
   - Send email to company when offer status changes
   - Integrate with email service

**Acceptance Criteria:**

- [ ] Company can submit offers with all required details
- [ ] Owner receives email notification for new offers
- [ ] Owner can view/filter/sort all offers
- [ ] Status changes trigger email notifications
- [ ] Offer history tracked
- [ ] Service enforces business rules (only company can submit, only owner can change status)

**Dependencies:** 2.2 (offer models), 2.1 (email service), 1.2 (user repository)

---

### Ticket 2.4: Offer REST API Endpoints

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `bid/router.py`

**Subtasks:**

1. Create Pydantic schemas — 2h
   - `OfferCreateRequest`, `OfferResponse`, `OfferListResponse`
   - `OfferUpdateStatusRequest`, `OfferFilterParams`
2. Implement REST endpoints — 5h
   - `POST /offers` — submit offer (company only)
   - `GET /offers` — list offers (owner: all, company: their own)
   - `GET /offers/{offer_id}` — get offer details
   - `PUT /offers/{offer_id}/status` — update status (owner only)
   - `POST /offers/{offer_id}/response` — add response message (owner only)
   - Add pagination, filtering (status, date range)
3. Add authorization checks — 1h
   - Ensure company users can only submit/view their offers
   - Ensure only owner can change status

**Acceptance Criteria:**

- [ ] Endpoints enforce role-based access control
- [ ] Pagination and filtering work correctly
- [ ] API returns appropriate errors for unauthorized access
- [ ] OpenAPI docs include all offer endpoints
- [ ] Integration tests cover happy path and error cases

**Dependencies:** 2.3 (offer service), 0.3 (auth dependencies)

---

### Ticket 2.5: Offer GraphQL Operations

**Priority:** P1 (High)  
**Estimate:** 8 hours  
**Assigned Module:** `bid/graphql/`, `graphql/mutation.py`, `graphql/query.py`

**Subtasks:**

1. Create Strawberry types — 2h
   - `OfferType`, `OfferStatusHistoryType`
   - Input types: `SubmitOfferInput`, `UpdateOfferStatusInput`
   - `OfferConnection` for pagination
2. Implement mutations — 3h
   - `submitOffer(input: SubmitOfferInput!): OfferType!`
   - `updateOfferStatus(offerId: ID!, status: OfferStatus!, message: String): OfferType!`
3. Implement queries — 3h
   - `offers(filter: OfferFilterInput, pagination: PaginationInput): OfferConnection!`
   - `offer(id: ID!): OfferType`
   - `myOffers(filter: OfferFilterInput): [OfferType!]!` (for companies)
4. Register in global schema — (included above)

**Acceptance Criteria:**

- [ ] GraphQL operations mirror REST API capabilities
- [ ] Pagination follows Relay cursor spec or offset-based
- [ ] Authorization enforced in resolvers
- [ ] GraphQL playground works for testing

**Dependencies:** 2.3 (offer service)

---

### Ticket 2.6: Offer Statistics & Insights (Owner Dashboard)

**Priority:** P2 (Medium)  
**Estimate:** 6 hours  
**Assigned Module:** `bid/domain/service.py`, `bid/router.py`

**Subtasks:**

1. Implement statistics calculations — 3h
   - Total offers by status
   - Average salary offered
   - Offers over time (chart data)
   - Top industries/companies
2. Create statistics endpoints — 2h
   - `GET /offers/stats` — aggregate statistics
   - `GET /offers/analytics` — time-series data for charts
3. Add to GraphQL — 1h
   - `offerStatistics: OfferStatistics!` query

**Acceptance Criteria:**

- [ ] Owner can view offer statistics on dashboard
- [ ] Data aggregations performant (use MongoDB aggregation pipeline)
- [ ] Statistics update in real-time or near-real-time
- [ ] Frontend can render charts from returned data

**Dependencies:** 2.3 (offer service)

---

## Sprint 3: Messaging & Real-Time Communication (2 weeks)

**Goal:** Enable owner and companies to communicate about offers via messaging.

### Ticket 3.1: Message Domain Models

**Priority:** P0 (Blocker)  
**Estimate:** 6 hours  
**Assigned Module:** `messaging/domain/model.py` (create new `messaging/` module)

**Subtasks:**

1. Create `Conversation` model — 3h
   - Fields: offer_id (reference), participants (list of user IDs), last_message_at, created_at
   - Indexes on offer_id, participants
2. Create `Message` model — 3h
   - Fields: conversation_id, sender_id, content, sent_at, read_at, attachments (optional)
   - Index on conversation_id, sent_at

**Acceptance Criteria:**

- [ ] Conversation links to offer
- [ ] Messages belong to conversation
- [ ] Models support unread count calculation
- [ ] Indexes optimize message retrieval

**Dependencies:** 0.1 (database), 2.2 (offer models)

---

### Ticket 3.2: Messaging Repository & Service

**Priority:** P0 (Blocker)  
**Estimate:** 10 hours  
**Assigned Module:** `messaging/domain/repository.py`, `messaging/domain/service.py`

**Subtasks:**

1. Create `ConversationRepository` — 2h
   - CRUD operations
   - `get_conversation_for_offer()`
   - `get_conversations_for_user()`
2. Create `MessageRepository` — 2h
   - CRUD operations
   - `get_messages_for_conversation()` with pagination
   - `mark_messages_as_read()`
3. Create `MessagingService` — 6h
   - `send_message()` — send message in conversation, notify recipient
   - `get_conversation()` — retrieve conversation with messages
   - `get_conversations_for_user()` — list all user's conversations
   - `mark_conversation_as_read()` — mark all messages read
   - Send email notification for new messages (optional unread threshold)

**Acceptance Criteria:**

- [ ] Messages sent successfully and stored
- [ ] Recipient receives email notification for new messages
- [ ] Conversations list sorted by last message time
- [ ] Unread count calculated correctly
- [ ] Only conversation participants can view/send messages

**Dependencies:** 3.1 (message models), 2.1 (email service)

---

### Ticket 3.3: Messaging REST API Endpoints

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `messaging/router.py`

**Subtasks:**

1. Create Pydantic schemas — 2h
   - `SendMessageRequest`, `MessageResponse`, `ConversationResponse`
2. Implement REST endpoints — 5h
   - `GET /conversations` — list user's conversations
   - `GET /conversations/{conversation_id}/messages` — get conversation messages (paginated)
   - `POST /conversations/{conversation_id}/messages` — send message
   - `PUT /conversations/{conversation_id}/read` — mark as read
3. Add authorization — 1h
   - Ensure only participants can access conversation

**Acceptance Criteria:**

- [ ] Endpoints enforce participant-only access
- [ ] Messages paginated (newest first or oldest first)
- [ ] Real-time updates via polling or WebSocket (see 3.5)
- [ ] Integration tests for messaging flow

**Dependencies:** 3.2 (messaging service)

---

### Ticket 3.4: Messaging GraphQL Operations

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `messaging/graphql/`

**Subtasks:**

1. Create Strawberry types — 2h
   - `ConversationType`, `MessageType`
   - Input: `SendMessageInput`
2. Implement mutations — 2h
   - `sendMessage(input: SendMessageInput!): MessageType!`
   - `markConversationAsRead(conversationId: ID!): Boolean!`
3. Implement queries — 2h
   - `conversations: [ConversationType!]!`
   - `conversation(id: ID!): ConversationType`

**Acceptance Criteria:**

- [ ] GraphQL operations match REST capabilities
- [ ] Authorization enforced in resolvers

**Dependencies:** 3.2 (messaging service)

---

### Ticket 3.5: Real-Time Messaging via GraphQL Subscriptions

**Priority:** P2 (Medium)  
**Estimate:** 12 hours  
**Assigned Module:** `messaging/graphql/subscription.py`, `graphql/subscription.py`

**Subtasks:**

1. Set up WebSocket support in FastAPI + Strawberry — 3h
   - Add WebSocket route to app
   - Configure Strawberry subscriptions
2. Implement message subscription — 4h
   - `messageSent(conversationId: ID!): MessageType!`
   - Publish message events when sent
   - Filter by conversation and user
3. Implement typing indicator (optional) — 3h
   - `userTyping(conversationId: ID!): TypingEvent!`
   - Publish typing events from frontend
4. Test subscriptions — 2h
   - Use GraphQL Playground or client to test real-time updates

**Acceptance Criteria:**

- [ ] Frontend receives new messages in real-time via subscription
- [ ] Subscription only delivers messages for authorized users
- [ ] WebSocket connection stable and handles reconnection
- [ ] Typing indicators show other user activity (optional)

**Dependencies:** 3.2 (messaging service), GraphQL subscription setup

---

### Ticket 3.6: File Attachments in Messages (Optional)

**Priority:** P3 (Low)  
**Estimate:** 8 hours  
**Assigned Module:** `messaging/`, file storage integration

**Subtasks:**

1. Set up file storage — 3h
   - Options: local file system, AWS S3, Cloudinary
   - Add storage configuration to settings
2. Implement file upload endpoint — 3h
   - `POST /messages/attachments` — upload file, return URL
   - Validate file type and size
   - Store file metadata
3. Link attachments to messages — 2h
   - Add `attachments` field to Message model
   - Display attachments in message response

**Acceptance Criteria:**

- [ ] Users can upload files with messages
- [ ] Files stored securely with access control
- [ ] Supported file types: images, PDFs, documents
- [ ] File size limits enforced

**Dependencies:** 3.2 (messaging service), file storage setup

---

## Sprint 4: Owner Dashboard & Admin Features (2 weeks)

**Goal:** Build owner-specific features for profile management, CV upload, and admin controls.

### Ticket 4.1: Owner Profile Management

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** `profile/` (create new module or extend `auth/`)

**Subtasks:**

1. Enhance OwnerProfile model — 2h
   - Add fields: skills (list), experience (list of objects), education (list)
   - Add portfolio projects, certifications
2. Create profile service — 4h
   - `update_owner_profile()` — update bio, skills, experience
   - `upload_cv()` — upload and store CV file, update profile
   - `get_public_profile()` — retrieve public profile for visitors
3. Create profile endpoints — 2h
   - `PUT /profile/owner` — update profile
   - `GET /profile/owner` — get own profile
   - `GET /profile/public` — get public profile (unauthenticated)

**Acceptance Criteria:**

- [ ] Owner can update all profile fields
- [ ] CV upload stores file and returns accessible URL
- [ ] Public profile visible without authentication
- [ ] Profile changes reflected immediately

**Dependencies:** 1.1 (user models), file storage setup

---

### Ticket 4.2: Skills & Abilities Visualization Data

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `profile/`

**Subtasks:**

1. Create skills data structure — 2h
   - Skills grouped by category (technical, soft, domain)
   - Proficiency levels (1-5 or beginner/advanced)
2. Add skills management endpoints — 3h
   - `POST /profile/owner/skills` — add skill
   - `PUT /profile/owner/skills/{skill_id}` — update skill
   - `DELETE /profile/owner/skills/{skill_id}` — remove skill
   - `GET /profile/owner/skills` — list skills with categories
3. Prepare data for frontend charts — 1h
   - Return skills in format suitable for chart libraries (Recharts, Visx)
   - Include skill categories and proficiency percentages

**Acceptance Criteria:**

- [ ] Skills stored with categories and proficiency levels
- [ ] Owner can CRUD skills easily
- [ ] Frontend receives data ready for visualization
- [ ] Public profile includes skills data

**Dependencies:** 4.1 (profile service)

---

### Ticket 4.3: Testimonials Management

**Priority:** P2 (Medium)  
**Estimate:** 6 hours  
**Assigned Module:** `testimonials/` (create new module)

**Subtasks:**

1. Create `Testimonial` model — 2h
   - Fields: author_name, author_title, author_company, content, rating (optional), created_at, is_approved
2. Create testimonial service — 2h
   - `add_testimonial()` — owner adds testimonial manually
   - `get_testimonials()` — retrieve approved testimonials for display
   - `approve_testimonial()` — owner approves testimonial (if submissions allowed)
3. Create endpoints — 2h
   - `POST /testimonials` — add testimonial
   - `GET /testimonials` — list approved testimonials
   - `PUT /testimonials/{id}/approve` — approve testimonial

**Acceptance Criteria:**

- [ ] Owner can manually add testimonials
- [ ] Only approved testimonials displayed publicly
- [ ] Testimonials include author details and content

**Dependencies:** 0.1 (database)

---

### Ticket 4.4: Contact Form & Inquiry Handling

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `contact/` (create new module)

**Subtasks:**

1. Create `ContactInquiry` model — 2h
   - Fields: name, email, message, created_at, is_read, replied_at
2. Create contact service — 2h
   - `submit_inquiry()` — visitor submits contact form, email sent to owner
   - `get_inquiries()` — owner views all inquiries
   - `mark_as_read()` — owner marks inquiry as read
3. Create endpoints — 2h
   - `POST /contact` — submit inquiry (public, rate-limited)
   - `GET /contact/inquiries` — list inquiries (owner only)
   - `PUT /contact/inquiries/{id}/read` — mark as read

**Acceptance Criteria:**

- [ ] Visitors can submit contact form without authentication
- [ ] Owner receives email notification for new inquiries
- [ ] Owner can view and manage inquiries in dashboard
- [ ] Rate limiting prevents spam

**Dependencies:** 2.1 (email service)

---

### Ticket 4.5: Admin Dashboard Statistics API

**Priority:** P2 (Medium)  
**Estimate:** 6 hours  
**Assigned Module:** `admin/` (create new module)

**Subtasks:**

1. Create dashboard statistics service — 4h
   - Total users (companies registered)
   - Total offers (by status)
   - Recent activity (new offers, messages)
   - Top companies by offer count
2. Create dashboard endpoint — 2h
   - `GET /admin/dashboard` — aggregate stats for owner dashboard

**Acceptance Criteria:**

- [ ] Dashboard returns key metrics for owner
- [ ] Statistics calculations performant
- [ ] Frontend can display stats in dashboard widgets

**Dependencies:** 2.3 (offer service), 3.2 (messaging service), 1.2 (user repository)

---

### Ticket 4.6: Content Management (Blog/Insights - Optional)

**Priority:** P3 (Low)  
**Estimate:** 10 hours  
**Assigned Module:** `blog/` (create new module)

**Subtasks:**

1. Create `BlogPost` model — 2h
   - Fields: title, slug, content (markdown), author_id, published_at, is_published, tags
2. Create blog service — 4h
   - CRUD operations for blog posts
   - `publish_post()`, `unpublish_post()`
   - `get_published_posts()` with pagination
3. Create endpoints — 3h
   - `POST /blog/posts` — create post (owner only)
   - `GET /blog/posts` — list published posts (public)
   - `GET /blog/posts/{slug}` — get post by slug
   - `PUT /blog/posts/{id}` — update post
   - `DELETE /blog/posts/{id}` — delete post
4. Add markdown rendering support — 1h

**Acceptance Criteria:**

- [ ] Owner can write and publish blog posts
- [ ] Posts support markdown formatting
- [ ] Public can view published posts
- [ ] SEO-friendly slugs and metadata

**Dependencies:** 0.1 (database)

---

## Sprint 5: Testing, Validation & Integration (2 weeks)

**Goal:** Comprehensive testing, API validation, security hardening, and integration testing.

### Ticket 5.1: Unit Test Coverage for Core Modules

**Priority:** P0 (Blocker)  
**Estimate:** 16 hours  
**Assigned Module:** `test/`

**Subtasks:**

1. Write unit tests for auth module — 4h
   - Test password hashing, JWT creation/validation
   - Test user registration and login logic
   - Mock repository dependencies
2. Write unit tests for offer module — 4h
   - Test offer creation, status updates
   - Test authorization logic
   - Mock dependencies
3. Write unit tests for messaging module — 4h
   - Test message sending, conversation creation
   - Test read status tracking
4. Write unit tests for email module — 2h
   - Test email template rendering
   - Test email sending (mock provider)
5. Set up test coverage reporting — 2h
   - Use pytest-cov
   - Target >80% coverage
   - Add coverage report to CI

**Acceptance Criteria:**

- [ ] All core services have unit tests
- [ ] Tests use mocks/fixtures for external dependencies
- [ ] Coverage report shows >80% for core modules
- [ ] Tests run fast (<30s for unit tests)
- [ ] All tests passing

**Dependencies:** All feature modules from Sprints 1-4

---

### Ticket 5.2: Integration Tests for API Endpoints

**Priority:** P0 (Blocker)  
**Estimate:** 16 hours  
**Assigned Module:** `test/`

**Subtasks:**

1. Set up test database — 2h
   - Use separate MongoDB database for tests
   - Add test fixtures for users, offers, messages
2. Write integration tests for auth endpoints — 4h
   - Test full registration → verification → login flow
   - Test password reset flow
   - Test protected endpoint access
3. Write integration tests for offer endpoints — 4h
   - Test company submits offer → owner views → owner updates status
   - Test offer filtering and pagination
4. Write integration tests for messaging endpoints — 4h
   - Test send message → receive notification → mark as read
   - Test conversation retrieval
5. Write integration tests for profile & admin endpoints — 2h

**Acceptance Criteria:**

- [ ] Integration tests use real database (test instance)
- [ ] Tests cover end-to-end user flows
- [ ] Tests validate HTTP status codes and response schemas
- [ ] Test data cleaned up after each test
- [ ] All integration tests passing

**Dependencies:** All API endpoints from Sprints 1-4

---

### Ticket 5.3: GraphQL Schema Validation & Testing

**Priority:** P1 (High)  
**Estimate:** 8 hours  
**Assigned Module:** `test/`, `graphql/`

**Subtasks:**

1. Validate GraphQL schema — 2h
   - Ensure schema valid and introspectable
   - Check for breaking changes
2. Write GraphQL query tests — 3h
   - Test queries with authentication
   - Test error handling
3. Write GraphQL mutation tests — 3h
   - Test mutations with valid/invalid data
   - Test authorization

**Acceptance Criteria:**

- [ ] GraphQL schema passes validation
- [ ] All GraphQL operations have tests
- [ ] GraphQL errors return meaningful messages
- [ ] Frontend can introspect schema successfully

**Dependencies:** All GraphQL resolvers from Sprints 1-4

---

### Ticket 5.4: Security Audit & Hardening

**Priority:** P0 (Blocker)  
**Estimate:** 12 hours  
**Assigned Module:** All modules

**Subtasks:**

1. Audit authentication & authorization — 3h
   - Ensure all protected endpoints require valid JWT
   - Ensure role-based access control enforced
   - Check for token expiration handling
2. Audit input validation — 3h
   - Ensure all inputs validated with Pydantic
   - Check for SQL/NoSQL injection risks
   - Validate file uploads (type, size)
3. Audit sensitive data handling — 2h
   - Ensure passwords never logged or returned
   - Ensure tokens stored securely
   - Check for data leaks in error messages
4. Add rate limiting — 2h
   - Protect public endpoints (login, contact form)
   - Use slowapi or similar
5. Add HTTPS enforcement — 1h
   - Redirect HTTP to HTTPS in production
   - Set secure cookie flags
6. Review dependencies for vulnerabilities — 1h
   - Run `pip audit` or `safety check`
   - Update vulnerable packages

**Acceptance Criteria:**

- [ ] All endpoints have proper authentication/authorization
- [ ] No sensitive data exposed in logs or errors
- [ ] Rate limiting active on public endpoints
- [ ] HTTPS enforced in production
- [ ] No known vulnerabilities in dependencies
- [ ] Security checklist reviewed and completed

**Dependencies:** All modules

---

### Ticket 5.5: Performance Testing & Optimization

**Priority:** P2 (Medium)  
**Estimate:** 10 hours  
**Assigned Module:** All modules

**Subtasks:**

1. Set up load testing — 3h
   - Use Locust or k6
   - Create test scenarios (login, submit offer, send message)
2. Run load tests and identify bottlenecks — 3h
   - Test with 100, 500, 1000 concurrent users
   - Monitor response times and error rates
3. Optimize database queries — 2h
   - Add missing indexes
   - Optimize aggregation pipelines
4. Optimize API response times — 2h
   - Add caching where appropriate (Redis)
   - Minimize payload sizes
   - Enable GZIP compression

**Acceptance Criteria:**

- [ ] API handles 500 concurrent users with <500ms p95 response time
- [ ] Database queries optimized with proper indexes
- [ ] No N+1 query issues
- [ ] Caching implemented for frequently accessed data
- [ ] Load test results documented

**Dependencies:** All modules

---

### Ticket 5.6: API Documentation & Postman Collection

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `docs/`

**Subtasks:**

1. Enhance OpenAPI documentation — 2h
   - Add descriptions to all endpoints
   - Add examples for request/response
   - Group endpoints by tags
2. Create Postman collection — 3h
   - Export OpenAPI to Postman
   - Add environment variables (base_url, tokens)
   - Add example requests for all endpoints
3. Write API usage guide — 1h
   - Document authentication flow
   - Provide code examples (Python, JavaScript)
   - Add to `backend-python/docs/API.md`

**Acceptance Criteria:**

- [ ] OpenAPI docs complete and accessible at `/docs`
- [ ] Postman collection includes all endpoints
- [ ] API usage guide clear and helpful for frontend developers
- [ ] GraphQL schema documentation available

**Dependencies:** All API endpoints

---

## Sprint 6: CI/CD, Deployment & Production Readiness (2 weeks)

**Goal:** Set up CI/CD pipeline, deploy to production, and ensure production readiness.

### Ticket 6.1: CI/CD Pipeline Setup (GitHub Actions)

**Priority:** P0 (Blocker)  
**Estimate:** 12 hours  
**Assigned Module:** `.github/workflows/`

**Subtasks:**

1. Create CI workflow for tests — 4h
   - Run unit tests on every PR
   - Run integration tests on every PR
   - Run linting (black, flake8, mypy)
   - Upload coverage reports
2. Create CD workflow for deployment — 4h
   - Build Docker image on merge to main
   - Push image to container registry (Docker Hub, ECR)
   - Deploy to staging environment automatically
   - Deploy to production with manual approval
3. Add status checks and branch protection — 2h
   - Require tests to pass before merge
   - Require code review
4. Set up secrets management — 2h
   - Add environment secrets to GitHub
   - Document required secrets

**Acceptance Criteria:**

- [ ] CI runs automatically on all PRs
- [ ] Tests must pass before merge
- [ ] Docker images built and pushed automatically
- [ ] Deployment to staging automatic on main branch
- [ ] Production deployment requires manual approval
- [ ] CI/CD pipeline documented

**Dependencies:** 5.1, 5.2 (tests)

---

### Ticket 6.2: Production Environment Setup

**Priority:** P0 (Blocker)  
**Estimate:** 16 hours  
**Assigned Module:** Infrastructure

**Subtasks:**

1. Choose hosting platform — 2h
   - Options: AWS (ECS, Fargate), Google Cloud Run, DigitalOcean, Heroku, Render
   - Consider cost, scalability, ease of use
2. Set up MongoDB production instance — 3h
   - Use MongoDB Atlas or self-hosted
   - Configure backups and replication
   - Set up monitoring
3. Deploy backend service — 4h
   - Deploy Docker container to hosting platform
   - Configure environment variables
   - Set up domain and SSL certificate
4. Set up Redis (for caching/sessions) — 2h
   - Use managed Redis (AWS ElastiCache, Redis Cloud)
   - Configure connection in backend
5. Configure CDN for static assets (optional) — 2h
   - Use CloudFront, Cloudflare, or similar
6. Set up monitoring and alerting — 3h
   - Use Sentry for error tracking
   - Use Datadog, New Relic, or CloudWatch for metrics
   - Set up alerts for errors and downtime

**Acceptance Criteria:**

- [ ] Backend deployed and accessible via domain
- [ ] HTTPS enabled with valid certificate
- [ ] MongoDB connected and data persists
- [ ] Environment variables configured securely
- [ ] Monitoring and error tracking active
- [ ] Backups scheduled for database

**Dependencies:** 6.1 (CI/CD for deployment)

---

### Ticket 6.3: Database Migration Strategy & Backup

**Priority:** P1 (High)  
**Estimate:** 6 hours  
**Assigned Module:** `database/migration/`

**Subtasks:**

1. Document migration process — 2h
   - Beanie doesn't have auto-migrations, document manual process
   - Create migration script template
2. Set up database backup automation — 2h
   - Use MongoDB Atlas automated backups or mongodump scripts
   - Schedule daily backups
   - Test backup restoration
3. Create initial data seeding script — 2h
   - Seed owner user and profile
   - Seed sample data for development

**Acceptance Criteria:**

- [ ] Migration process documented
- [ ] Automated backups running daily
- [ ] Backup restoration tested successfully
- [ ] Initial data seeding script works

**Dependencies:** 6.2 (production database)

---

### Ticket 6.4: Production Configuration & Secrets Management

**Priority:** P0 (Blocker)  
**Estimate:** 6 hours  
**Assigned Module:** `core/config.py`, infrastructure

**Subtasks:**

1. Set up secrets management — 3h
   - Use AWS Secrets Manager, GCP Secret Manager, or HashiCorp Vault
   - Store database credentials, JWT secret, API keys
   - Update app to fetch secrets on startup
2. Configure production settings — 2h
   - Set APP_STAGE=production
   - Disable debug mode
   - Set secure CORS origins
   - Configure logging for production
3. Document environment variables — 1h
   - Update README with all required env vars for production

**Acceptance Criteria:**

- [ ] Secrets stored securely, not in code or Docker image
- [ ] App fetches secrets on startup
- [ ] Production configuration secure and optimized
- [ ] Environment variables documented

**Dependencies:** 6.2 (production environment)

---

### Ticket 6.5: Load Balancing & Auto-Scaling (Optional)

**Priority:** P3 (Low)  
**Estimate:** 8 hours  
**Assigned Module:** Infrastructure

**Subtasks:**

1. Set up load balancer — 3h
   - Use AWS ALB, GCP Load Balancer, or similar
   - Configure health checks
2. Configure auto-scaling — 3h
   - Scale based on CPU/memory usage or request count
   - Set min/max instances
3. Test scaling behavior — 2h
   - Simulate traffic spikes
   - Verify new instances spin up

**Acceptance Criteria:**

- [ ] Load balancer distributes traffic across instances
- [ ] Auto-scaling triggers based on load
- [ ] Health checks remove unhealthy instances
- [ ] Scaling tested under load

**Dependencies:** 6.2 (production environment)

---

### Ticket 6.6: Final Production Checklist & Go-Live

**Priority:** P0 (Blocker)  
**Estimate:** 8 hours  
**Assigned Module:** All

**Subtasks:**

1. Run final end-to-end tests in production — 3h
   - Test full user flows (registration, login, offer submission, messaging)
   - Test email delivery in production
   - Test payment/integrations if any
2. Performance testing in production — 2h
   - Run load tests against production
   - Verify response times and error rates
3. Security review — 2h
   - Run security scan (OWASP ZAP, Burp Suite)
   - Verify HTTPS and security headers
   - Check for exposed secrets or sensitive data
4. Final documentation review — 1h
   - Ensure README, API docs, and runbooks complete
   - Document rollback procedure

**Acceptance Criteria:**

- [ ] All end-to-end tests passing in production
- [ ] Performance meets targets (see 5.5)
- [ ] Security scan passes with no critical issues
- [ ] Documentation complete and up-to-date
- [ ] Rollback procedure tested
- [ ] Go-live approved by stakeholders

**Dependencies:** All previous tickets

---

## Additional Tickets (Backlog / Future Sprints)

### Backlog.1: Social Authentication (OAuth)

**Priority:** P2 (Medium)  
**Estimate:** 10 hours  
**Module:** `auth/`

**Description:** Allow users to register/login with Google, LinkedIn, GitHub.

---

### Backlog.2: Export Offers to CSV/PDF

**Priority:** P3 (Low)  
**Estimate:** 6 hours  
**Module:** `bid/`

**Description:** Owner can export all offers to CSV or PDF for analysis/archiving.

---

### Backlog.3: Advanced Search & Filtering

**Priority:** P2 (Medium)  
**Estimate:** 8 hours  
**Module:** Multiple

**Description:** Full-text search for offers, messages, and profiles using MongoDB text indexes or Elasticsearch.

---

### Backlog.4: Notification Preferences

**Priority:** P2 (Medium)  
**Estimate:** 6 hours  
**Module:** `auth/`, `email/`

**Description:** Users can configure which email notifications they receive (new offer, new message, etc.).

---

### Backlog.5: Multi-Language Support (i18n)

**Priority:** P3 (Low)  
**Estimate:** 12 hours  
**Module:** All

**Description:** Support multiple languages for emails and API responses.

---

### Backlog.6: Analytics & Reporting Dashboard

**Priority:** P2 (Medium)  
**Estimate:** 16 hours  
**Module:** `analytics/`

**Description:** Advanced analytics for owner (offer trends, company insights, traffic sources).

---

## Summary & Timeline

| Sprint   | Duration | Focus Area     | Key Deliverables                                                |
| -------- | -------- | -------------- | --------------------------------------------------------------- |
| Sprint 0 | 2 weeks  | Foundation     | Database, config, security, Docker, logging                     |
| Sprint 1 | 2 weeks  | Auth & Users   | Registration, login, JWT, email verification, profiles          |
| Sprint 2 | 2 weeks  | Offers & Email | Offer submission, status management, notifications              |
| Sprint 3 | 2 weeks  | Messaging      | Conversations, real-time messaging, file attachments            |
| Sprint 4 | 2 weeks  | Owner Features | Profile management, testimonials, contact form, admin dashboard |
| Sprint 5 | 2 weeks  | Testing & QA   | Unit tests, integration tests, security audit, performance      |
| Sprint 6 | 2 weeks  | Deployment     | CI/CD, production setup, monitoring, go-live                    |

**Total Duration:** 12 weeks (3 months)

**Total Estimated Hours:** ~350-400 hours

---

## Notes & Best Practices

1. **Daily Standups:** Track progress, blockers, and dependencies
2. **Code Reviews:** All code should be reviewed before merge
3. **Test-Driven Development (TDD):** Write tests alongside features when possible
4. **Documentation:** Update docs as features are built
5. **Agile Principles:** Iterate, get feedback, adapt
6. **Security First:** Consider security at every step
7. **Performance:** Profile and optimize as you build
8. **User Feedback:** Test with real users early and often

---

## Risk & Mitigation

| Risk                                          | Impact | Probability | Mitigation                                                                  |
| --------------------------------------------- | ------ | ----------- | --------------------------------------------------------------------------- |
| Database migration issues                     | High   | Medium      | Document migration process, test thoroughly, have rollback plan             |
| Security vulnerability                        | High   | Medium      | Security audit in Sprint 5, regular dependency updates, penetration testing |
| Performance bottlenecks                       | Medium | Medium      | Load testing in Sprint 5, optimize queries, add caching                     |
| Third-party service downtime (email, storage) | Medium | Low         | Use reliable providers, have fallback options, implement retry logic        |
| Scope creep                                   | Medium | High        | Stick to sprint plan, defer non-critical features to backlog                |
| Integration issues with frontend              | Medium | Medium      | Regular communication, API documentation, early integration testing         |

---

## Success Metrics

- [ ] All Sprint 0-6 tickets completed
- [ ] Test coverage >80%
- [ ] API response time <500ms p95
- [ ] Zero critical security vulnerabilities
- [ ] Backend deployed to production
- [ ] CI/CD pipeline operational
- [ ] API documentation complete
- [ ] All end-to-end flows working in production

---

**End of Backend Sprint Plan**

This plan is iterative and should be adjusted based on team velocity, feedback, and changing requirements. Prioritize completing Sprint 0-1 first to establish a solid foundation, then build features incrementally.
