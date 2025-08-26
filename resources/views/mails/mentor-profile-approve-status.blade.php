<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fomoedge - Application Review Update</title>
</head>

<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
        <!-- Logo Section -->
        <div style="background-color: #FFC93B; text-align: center; padding: 20px;">
            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge Logo" style="height: 100px; width: 200px;">
        </div>

        <!-- Greeting -->
        <h1 style="color: #000; text-align: center;">Hi, {{ $user->full_name ?? '' }}</h1>

        <!-- Introductory Message -->
        <p style="font-size: 16px; font-weight: bold; font-style: italic;">Thank you for joining Fomoedge! We’re excited to have you on board.</p>
        <p style="font-size: 16px;">To begin with, let me tell you a bit about what makes Fomoedge special.</p>

        <!-- Section: Why Choose Fomoedge -->
        <h2 style="color: #4CAF50;">Why Choose Fomoedge?</h2>

        <h3 style="color: #333;">For Learners:</h3>
        <p style="font-size: 16px; font-style: italic; line-height: 1.5;">Fomoedge is a mentorship platform connecting learners with experts. We believe everyone deserves personalized guidance to navigate their personal and professional journey. Real growth comes from learning directly from those who’ve walked the path before you.</p>

        <h3 style="color: #333;">For Mentors:</h3>
        <ul style="font-size: 16px; line-height: 1.5; padding-left: 20px;">
            <li><strong>Contribute to a Better Future:</strong> Help shape the leaders of tomorrow by guiding mentees toward their goals.</li>
            <li><strong>Build Your Brand:</strong> Establish yourself as a trusted expert in your field.</li>
            <li><strong>Set Your Own Terms:</strong> Decide your schedule and rates for maximum flexibility.</li>
            <li><strong>Monetize Your Knowledge:</strong> Turn your skills into a revenue stream with tailored mentoring sessions.</li>
            <li>Be part of a unique ecosystem and Fomoedge's exciting future plans.</li>
        </ul>

        <!-- Section: How Are We Different -->
        <h2 style="color: #4CAF50;">How Are We Different?</h2>
        <p><strong>Our Vision:</strong> We focus on enriching lives, not profits. The goal is impact, not earnings.</p>
        <p><strong>Authentic Mentors:</strong> We rigorously vet each mentor to ensure genuine expertise. No upselling. No hidden agendas. Just pure, personalized guidance.</p>
        <p><strong>Focused Expertise:</strong> Our mentors specialize in just three areas to ensure quality advice. We believe in focused learning, not being a jack-of-all-trades.</p>

        <!-- Section: Getting Started -->
        <h2 style="color: #4CAF50;">Getting Started</h2>
        <ul style="font-size: 16px; line-height: 1.5; padding-left: 20px;">
            <li>Log in and complete your profile.</li>
            <li>Use an alias if you prefer not to show your real name.</li>
            <li>Choose three topics to mentor in and select relevant subtopics. Let us know if your topic isn’t listed, and we’ll add it!</li>
            <li>Add your bank details securely via Razorpay for payouts.</li>
            <li>Set your rates and time slots based on availability.</li>
            <li>Submit your profile for review. We’ll get in touch if updates are needed.</li>
            <li>Select what details or links you wish to share with learners.</li>
        </ul>

        <p style="color: red; font-size: 16px;">Non-Negotiable Guidelines:</p>
        <p style="font-size: 16px;">No personal information sharing during video sessions.</p>

        <!-- Section: How It Works for Learners -->
        <h2 style="color: #4CAF50;">How It Works for Learners:</h2>
        <ul style="font-size: 16px; line-height: 1.5; padding-left: 20px;">
            <li><strong>Find a Mentor:</strong> Search by skills, industry, or career phase.</li>
            <li><strong>Book a Session:</strong> Choose a time that works for you.</li>
            <li><strong>Receive Real Guidance:</strong> Get actionable advice to move forward confidently.</li>
        </ul>

        <!-- Section: Our Expectations -->
        <h2 style="color: #4CAF50;">Our Expectations from You:</h2>
        <ul style="font-size: 16px; line-height: 1.5; padding-left: 20px;">
            <li><strong>Spread the Word:</strong> Share your experiences on LinkedIn to help others discover Fomoedge.</li>
            <li><strong>Share Positive Moments:</strong> If you love a session, a simple post can help us grow.</li>
            <li><strong>Recommend Great Mentors:</strong> Help us connect with individuals who offer valuable guidance.</li>
        </ul>

        <p style="font-size: 16px;">Fomoedge exists to cut through the noise and give people the power of trusted, one-on-one mentorship. With the right mentor, no dream is too big, and no goal is out of reach.</p>
        <p style="font-size: 16px;">We’re excited to start this journey with you!</p>

        <!-- Call-to-Action Button -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="{{ route('login') }}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 18px; border-radius: 4px;">Access Your Account</a>
        </div>

        <!-- Closing -->
        <p style="font-size: 16px;">Warm regards,</p>
        <p style="font-size: 16px;">Admin</p>
    </div>
</body>

</html>
