from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from openai import OpenAI
import os
from datetime import datetime
import logging
import tempfile
import subprocess
from pydub import AudioSegment

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configure OpenRouter API
OPENROUTER_API_KEY = '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'
client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Ayndrome Delivery Assistant",
    }
)

def convert_audio_to_wav(input_file, output_file):
    """Convert any audio format to WAV using ffmpeg"""
    try:
        # Use ffmpeg directly for conversion
        subprocess.run([
            'ffmpeg', '-i', input_file,
            '-acodec', 'pcm_s16le',
            '-ar', '44100',
            '-ac', '1',
            output_file
        ], check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error converting audio with ffmpeg: {e.stderr.decode()}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error in audio conversion: {str(e)}")
        return False

def process_voice_input(audio_file):
    """Process voice input and convert to text"""
    recognizer = sr.Recognizer()
    try:
        # Save the input audio file
        with tempfile.NamedTemporaryFile(suffix='.webm', delete=False) as temp_input:
            audio_file.save(temp_input.name)
            logger.debug(f"Saved input audio to: {temp_input.name}")
            
            # Convert to WAV
            temp_wav = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
            temp_wav.close()  # Close the file so we can write to it
            
            if not convert_audio_to_wav(temp_input.name, temp_wav.name):
                raise Exception("Failed to convert audio to WAV format")
            
            logger.debug(f"Converted audio to WAV: {temp_wav.name}")
            
            # Use the WAV file with the recognizer
            with sr.AudioFile(temp_wav.name) as source:
                # Adjust for ambient noise
                recognizer.adjust_for_ambient_noise(source)
                audio_data = recognizer.record(source)
                logger.debug("Audio recorded successfully")
                
                # Convert audio data to text
                logger.debug("Attempting to recognize audio...")
                text = recognizer.recognize_google(audio_data)
                logger.debug(f"Successfully recognized text: {text}")
                
                # Clean up temporary files
                os.unlink(temp_input.name)
                os.unlink(temp_wav.name)
                return text
    except sr.UnknownValueError:
        logger.error("Could not understand audio")
        return "Could not understand audio"
    except sr.RequestError as e:
        logger.error(f"Error with speech recognition service: {e}")
        return f"Error with speech recognition service: {e}"
    except Exception as e:
        logger.error(f"Unexpected error in process_voice_input: {str(e)}")
        return f"Unexpected error: {str(e)}"

def analyze_delivery_request(text):
    """Analyze the delivery request using OpenRouter's Gemma model"""
    try:
        logger.debug(f"Analyzing delivery request: {text}")
        prompt = f"""You are a delivery scheduling assistant. Extract and structure the following delivery details from the user's request:
        {text}
        
        Please provide the information in this format:
        - Delivery Date/Time:
        - Delivery Address:
        - Package Details:
        - Special Instructions:
        - Priority Level:
        """
        
        completion = client.chat.completions.create(
            model="google/gemma-3-1b-it:free",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        response = completion.choices[0].message.content
        logger.debug(f"Received response from model: {response}")
        return response
    except Exception as e:
        logger.error(f"Error in analyze_delivery_request: {str(e)}")
        return f"Error analyzing request: {str(e)}"

@app.route('/process-voice', methods=['POST'])
def process_voice():
    try:
        logger.debug("Received POST request to /process-voice")
        
        if 'audio' not in request.files:
            logger.error("No audio file in request")
            return jsonify({
                'status': 'error',
                'message': 'No audio file provided'
            }), 400

        # Get audio data from request
        audio_file = request.files['audio']
        logger.debug(f"Received audio file: {audio_file.filename}")
        
        # Convert voice to text
        text = process_voice_input(audio_file)
        logger.debug(f"Processed text: {text}")
        
        # Analyze the request
        analysis = analyze_delivery_request(text)
        logger.debug(f"Analysis result: {analysis}")
        
        return jsonify({
            'status': 'success',
            'text': text,
            'analysis': analysis
        })
    except Exception as e:
        logger.error(f"Error in process_voice endpoint: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 



    