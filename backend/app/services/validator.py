from app.utils.constants import SUPPORTED_TONES


def validate_tone(tone):

    if tone not in SUPPORTED_TONES:
        raise ValueError("Invalid tone")

    return True