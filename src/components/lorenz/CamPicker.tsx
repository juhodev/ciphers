import * as React from 'react';
import { Cam } from '../Types';
import './CamPicker.scss';
import Select from '../UI/Select';

interface CamPickerProps {
	cams: number[];
	id: number;
	select: JSX.Element;
	onChange: (camIndex: number, value: number) => void;
}

interface CamPickerState {
	canvas: HTMLCanvasElement;
	camWidth: number;
	camHeight: number;
	camMargin: number;
}

export default class CamPicker extends React.Component<
	CamPickerProps,
	CamPickerState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			canvas: undefined,
			camWidth: 15,
			camHeight: 15,
			camMargin: 4,
		};
		this.canvasClickEvent = this.canvasClickEvent.bind(this);
	}

	componentDidMount() {
		this.setState({ canvas: this.refs.canvas as HTMLCanvasElement });
	}

	createPickerCams(): Cam[] {
		const { camWidth, camHeight, camMargin } = this.state;

		const originalCams = this.props.cams;
		const pickerCams: Cam[] = [];

		let currentX = 0;
		let currentY = 1;

		originalCams.forEach(cam => {
			pickerCams.push({
				position: cam,
				x: currentX,
				y: currentY,
			});

			if (currentX >= (camWidth + camMargin) * 9) {
				currentX = 0;
				currentY += camHeight + camMargin;
			} else {
				currentX += camWidth + camMargin;
			}
		});

		return pickerCams;
	}

	canvasClickEvent(e: MouseEvent) {
		const { cams, onChange } = this.props;
		const { canvas, camWidth, camHeight, camMargin } = this.state;

		const clientRect: ClientRect = canvas.getBoundingClientRect();
		const x: number = e.clientX - clientRect.left;
		const y: number = e.clientY - clientRect.top;

		const camX: number = Math.ceil(x / (camWidth + camMargin));
		const camY: number = Math.ceil(y / (camHeight + camMargin)) - 1;

		const camIndex: number = camY * 10 + camX - 1;
		const value: number = cams[camIndex] === 0 ? 0b1 : 0b0;

		onChange(camIndex, value);
	}

	drawCanvas() {
		const { canvas } = this.state;
		if (canvas !== undefined) {
			const ctx = canvas.getContext('2d');
			const camWidth: number = 15;
			const camHeight: number = 15;
			const pickerCams: Cam[] = this.createPickerCams();

			canvas.addEventListener('click', this.canvasClickEvent, true);

			ctx.clearRect(0, 0, 190, 130);

			pickerCams.forEach(cam => {
				ctx.beginPath();
				ctx.rect(cam.x, cam.y, camWidth, camHeight);
				if (cam.position === 0) {
					ctx.fillStyle = '#000';
					ctx.fill();
				} else {
					ctx.fillStyle = '#fff';
					ctx.fill();
				}
				ctx.fillStyle = '#000';
				ctx.stroke();
				ctx.closePath();
			});
		}
	}

	componentWillUpdate() {
		const { canvas } = this.state;

		if (canvas !== undefined) {
			canvas.removeEventListener('click', this.canvasClickEvent, true);
		}
	}

	render() {
		this.drawCanvas();
		const { select } = this.props;

		return (
			<div className="cam-picker">
				<div className="cam-picker-name">
					{`Wheel ${this.props.id + 1} cams`}
				</div>
				<canvas ref="canvas" width={190} height={130} />
				{select}
			</div>
		);
	}
}
